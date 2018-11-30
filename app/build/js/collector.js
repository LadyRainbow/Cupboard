
(function () {

    function deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    var TYPES = [
        {
            key: 'kitchen',
            name: 'Кухня',
            imgSrc: '../../build/img/popup/collect1.png'
        },
        {
            key: 'cupboard',
            name: 'Шкаф',
            imgSrc: '../../build/img/popup/collect2.png',
            skipStepIndex: 1
        },
    ];

    var KITCHEN_VISIONS = [
        {
            key: 'v1',
            name: 'Прямая',
            imgSrc: '../../build/img/popup/form1.png',
            imgSrc2: '../../build/img/popup/form1AB.png',
            sizes: [
                {
                    key: 'side1',
                    name: 'Сторона А'
                },
            ]
        },
        {
            key: 'v2',
            name: 'Г-образная <br>(право)',
            imgSrc: '../../build/img/popup/form2.png',
            imgSrc2: '../../build/img/popup/form2AB.png',
            sizes: [
                {
                    key: 'side1',
                    name: 'Сторона А'
                },
                {
                    key: 'side2',
                    name: 'Сторона B'
                },
            ]
        },
        {
            key: 'v3',
            name: 'Г-образная <br>(лево)',
            imgSrc: '../../build/img/popup/form3.png',
            imgSrc2: '../../build/img/popup/form3AB.png',
            sizes: [
                {
                    key: 'side1',
                    name: 'Сторона А'
                },
                {
                    key: 'side2',
                    name: 'Сторона B'
                },
            ]
        },
        {
            key: 'v4',
            name: 'П-образная',
            imgSrc: '../../build/img/popup/form4.png',
            imgSrc2: '../../build/img/popup/form4AB.png',
            sizes: [
                {
                    key: 'side1',
                    name: 'Сторона А'
                },
                {
                    key: 'side2',
                    name: 'Сторона B'
                },
            ]
        },
    ];

    var CUPBOARD_SIZES = [
        {
            key: 'height',
            name: 'Высота',
            value: ''
        },
        {
            key: 'width',
            name: 'Ширина',
            value: ''
        },
        {
            key: 'deep',
            name: 'Глубина',
            value: ''
        },
    ];

    var MATERIALS = {
        kitchen: [
            {
                key: 'MDF',
                name: 'МДФ',
            },
            {
                key: 'plastic',
                name: 'Пластик',
            },
            {
                key: 'membrane',
                name: 'Пленка ПВХ',
            },
        ],
        cupboard: [
            {
                key: 'chipboard',
                name: 'ДСП',
            },
            {
                key: 'glass',
                name: 'Стекло',
            },
            {
                key: 'combined',
                name: 'Комби',
            },
        ],
    };

    var DEFAULT_STEP_COUNTER = 5;

    function Collector(options) {
        this.type = null;
        this.kitchenVision = null;
        this.sizes = null;
        this.notKnownSizes = false;
        this.material = null;
        this.name = '';
        this.phone = '';
        this.stepIndex = 0;
        this.cb = {
            onSendBtnClick: options.onSendBtnClick ? options.onSendBtnClick : function () {}
        };

        this.DR = { // DR - DOM references
            wrapper: options.wrapper,
            stepsIndicators: options.stepsIndicators,
            stepActionName: options.stepActionName,
            stepCounterName: options.stepCounterName,
            stepsWrappers: options.stepsWrappers,
            nextStepBtn: options.nextStepBtn,
            nameInput: options.nameInput,
            phoneInput: options.phoneInput,
            sendBtn: options.sendBtn,
            dynamicContentWrapperStep4: options.dynamicContentWrapperStep4,
        };



        var that = this;
        this.DR.nextStepBtn.on('click.collector', function () {
            that.goToNextStep();
        });

        // this.DR.stepsIndicators.on('click.collector', function () {
        //     var index = $(this).index();
        //     that.goToIndexStep();
        // });

        this.DR.nameInput.on('input.collector', function () {
            that.name = $(this).val();
        });

        this.DR.phoneInput.on('input.collector', function () {
            that.phone = $(this).val();
        });

        this.DR.sendBtn.on('click.collector', function () {
            var data = that.getDataForSending();
            if (!data) {
                return;
            }
            that.cb.onSendBtnClick(data);
        });
        this.renderStep1();
        this.updateState();

    }


    Collector.prototype.getDataForSending = function () {
        if (!this.canNextGo()) {
            return;
        }

        var result = {};
        result.type = {
            key: this.type.key,
            name: this.type.name,
        };
        if (this.isKitchenFlow()) {
            result.kitchenVision = {
                key: this.kitchenVision.key,
                name: this.kitchenVision.name,
            };
        }
        result.notKnownSizes = this.notKnownSizes;
        result.sizes = this.sizes;
        result.material = this.material;
        result.name = this.name;
        result.phone = this.phone;
        return result;
    }

    Collector.prototype.isKitchenFlow = function () {
        return this.type && this.type.key === 'kitchen';
    }

    Collector.prototype.getActualStepCounters = function () {
        return this.type
            ? (this.isKitchenFlow() ? DEFAULT_STEP_COUNTER : (DEFAULT_STEP_COUNTER - 1))
            : DEFAULT_STEP_COUNTER;
    }

    Collector.prototype.updateStepCountersTitle = function () {
        var maxStepCounter = this.getActualStepCounters();
        var currentStepCounter = this.stepIndex + 1;
        var title = 'Шаг ' + currentStepCounter + ' из ' + maxStepCounter;
        this.DR.stepCounterName.text(title);
    }

    Collector.prototype.getSkipStepIndex = function () {
        return this.type && this.type.skipStepIndex !== undefined
            ? this.type.skipStepIndex
            : null;
    }
    Collector.prototype.getActiveIndexStepDR = function () {
        var skipStepIndex = this.getSkipStepIndex();
        if (skipStepIndex === null) {
            return this.stepIndex;
        }
        if (this.stepIndex >= skipStepIndex) {
            return this.stepIndex + skipStepIndex;
        }
        return this.stepIndex;
    }

    Collector.prototype.updateActiveStep = function () {
        var activeIndexDR = this.getActiveIndexStepDR();
        this.DR.stepsWrappers.removeClass('active');
        $(this.DR.stepsWrappers[activeIndexDR]).addClass('active');
    }

    Collector.prototype.updateStepActionName = function () {
        var stepActionName = this.getStepActionName();
        this.DR.stepActionName.text(stepActionName);
    }

    Collector.prototype.updateStepIndicators = function () {
        var activeIndexDR = this.getActiveIndexStepDR();
        this.DR.stepsIndicators.removeClass('active');

        for (var i = 0; i <= activeIndexDR; i++) {
            $(this.DR.stepsIndicators[i]).addClass('active');
        }

        var skipStepIndex = this.getSkipStepIndex();
        this.DR.stepsIndicators.removeClass('hidden');
        if (skipStepIndex !== null) {
            $(this.DR.stepsIndicators[skipStepIndex]).addClass('hidden');
        }

    }

    Collector.prototype.updateNextBtnVisibility = function () {
        if ((this.stepIndex + 1) >= this.getActualStepCounters()) {
            this.DR.nextStepBtn.addClass('hidden');
        } else {
            this.DR.nextStepBtn.removeClass('hidden');
        }
    }


    Collector.prototype.updateState = function () {
        this.updateActiveStep();
        this.updateStepCountersTitle();
        this.updateStepActionName();
        this.updateStepIndicators();
        this.updateNextBtnVisibility();

        this.renderStep2();
        this.renderStep3();
        this.renderStep4();





    };

    Collector.prototype.areSizesFilling = function () {
        if (!this.sizes) {
            return false;
        }
        return this.sizes.every(function (size) {
            return !!size.value;
        });

    }


    Collector.prototype.goToIndexStep = function (indexStep) {
        this.stepIndex = indexStep;
        this.updateState();
    }

    Collector.prototype.canNextGo = function () {
        if (this.stepIndex === 0) {
            if (this.type) {
                return true;
            }
        }

        if (this.stepIndex === 1 && this.isKitchenFlow()) {
            if (this.kitchenVision) {
                return true;
            }
        }
        if (this.stepIndex === 1 && !this.isKitchenFlow()) {
            if (this.areSizesFilling() || this.notKnownSizes) {
                return true;
            }
        }

        if (this.stepIndex === 2 && this.isKitchenFlow()) {
            if (this.areSizesFilling() || this.notKnownSizes) {
                return true;
            }
        }
        if (this.stepIndex === 2 && !this.isKitchenFlow()) {
            if (this.material) {
                return true;
            }
        }

        if (this.stepIndex === 3 && this.isKitchenFlow()) {
            if (this.material) {
                return true;
            }
        }
        if (this.stepIndex === 3 && !this.isKitchenFlow()) {
            if (this.name && this.phone) {
                return true;
            }
        }

        if (this.stepIndex === 4 && this.isKitchenFlow()) {
            if (this.name && this.phone) {
                return true;
            }
        }

        return false;
    }

    Collector.prototype.goToNextStep = function () {
        var nextStepIndex = this.stepIndex + 1;
        if (!this.canNextGo()) {
            return;
        }
        this.goToIndexStep(nextStepIndex);
    };


    Collector.prototype.getStepActionName = function () {
        var result = '';
        switch (this.stepIndex) {
            case 0:
                result = 'Выберите свой вариант'
                break;
            case 1:
                result = this.isKitchenFlow()
                    ? 'Выберите форму будущей кухни'
                    : 'Укажите размеры вашего шкафа'
                break;
            case 2:
                result = this.isKitchenFlow()
                    ? 'Укажите размеры вашей кухни'
                    : 'Выберите желаемый тип фасада (дверей)';
                break;
            case 3:
                result = this.isKitchenFlow()
                    ? 'Выберите желаемый тип фасада'
                    : 'Введите ваш телефон и наш менеджер перезвонит вам, сообщив стоимость мебели';
                break;
            case 4:
                result = 'Введите ваш телефон и наш менеджер перезвонит вам, сообщив стоимость мебели';
                break;
        }
        return result;
    };



    Collector.prototype.renderStep1 = function () {
        var stepDR = $(this.DR.stepsWrappers[0]);
        var that = this;
        stepDR.html('');
        var html = [];
        TYPES.forEach(function (type, index) {
            var localHtml = '';
            localHtml += '<div class="itemForStep1">';
                localHtml += '<img src="' + type.imgSrc + '">';
                localHtml += '<div>' + type.name + '</div>';
            localHtml += '</div>';

            var dr = $(localHtml);
            stepDR.append(dr);
            dr.on('click.collector', function () {
                $('.itemForStep1').removeClass('active');
                $(this).addClass('active');
                that.type = deepClone(TYPES[index]);
                if (that.isKitchenFlow()) {
                    that.sizes = null;
                } else {
                    that.sizes = deepClone(CUPBOARD_SIZES);
                }
                that.updateState();
            });

        });
    }

    // KITCHEN_VISIONS
    Collector.prototype.renderStep2 = function () {
        var stepDR = $(this.DR.stepsWrappers[1]);
        var that = this;
        if (!this.isKitchenFlow()) {
            return;
        }
        stepDR.html('');
        KITCHEN_VISIONS.forEach(function (vision, index) {
            var localHtml = '';
            localHtml += '<div class="itemForStep2">';
                localHtml += '<img src="' + vision.imgSrc + '">';
                localHtml += '<div><p>' + vision.name + '</p></div>';
            localHtml += '</div>';

            var dr = $(localHtml);
            stepDR.append(dr);
            dr.on('click.collector', function () {
                $('.itemForStep2').removeClass('active');
                $(this).addClass('active');
                var selectedKitchenVision = deepClone(KITCHEN_VISIONS[index]);
                selectedKitchenVision.sizes.forEach(function (size) {
                    size.value = '';
                });
                that.kitchenVision = selectedKitchenVision;
                that.sizes = selectedKitchenVision.sizes.map(function (size) {
                    size.value = '';
                    return size;
                });
                // that.updateState();
            });

        });
    }

    // SIZES
    Collector.prototype.renderStep3 = function () {
        if (!(this.type && this.sizes)) {
            return;
        }

        var stepDR = $(this.DR.stepsWrappers[2]);
        var that = this;
        var imgSrc;
        if (this.kitchenVision) {
            imgSrc = this.kitchenVision.imgSrc2;
        }

        stepDR.html('');
        var html = '';
        html += '<div class="card-content-wrp">';
            if (imgSrc) {
                html += '<div class="img-kitchen-wrp"><img src="' + imgSrc + '"></div>';
            }
            html += '<form class="sizesWrapper">';
                html += '<div class="notKnownSizesBtn"><p>Я не знаю размеров</p></div>';
            html += '</form>';
        html += '</div>';
        stepDR.append(html);
        var notKnownSizesBtnDR = stepDR.find('.notKnownSizesBtn');
        var sizesWrapperDR = stepDR.find('.sizesWrapper');
        notKnownSizesBtnDR.on('click.collector', function () {
            console.log("notKnownSizesBtnDR");
            that.notKnownSizes = !that.notKnownSizes;
            var inputs = stepDR.find('input');
            if (that.notKnownSizes) {
                $(notKnownSizesBtnDR).addClass('active');

                $('form.sizesWrapper')[0].reset();

                inputs.addClass('disabled');
                inputs.attr('disabled', 'true');
            } else {
                $(notKnownSizesBtnDR).removeClass('active');
                inputs.removeClass('disabled');
                inputs.removeAttr('disabled');
            }
        });

        this.sizes.forEach(function (size, index) {
            var localHtml = '';
            localHtml += '<div class="itemForStep3">';
                localHtml += '<p>' + size.name + '</p>';
                localHtml += '<div>';
                    localHtml += '<input type="number">';
                localHtml += '</div>';
            localHtml += '</div>';

            var dr = $(localHtml);
            stepDR.append(dr);

            dr.appendTo('.sizesWrapper');

            dr.find('input').on('input.collector', function () {
                that.sizes[index].value = $(this).val();
                if(isNaN(that.sizes[index].value)) {
                    console.log("sizes " + that.sizes[index].value);
                } else {
                    console.log("smth");
                }
            });
        });
        // $(htmlnotKnownSizesBtn).appendTo('.sizesWrapper');
    }


    // MATERIALS
    Collector.prototype.renderStep4 = function () {
        // var stepDR = $(this.DR.stepsWrappers[3]);
        var stepDR = $(this.DR.dynamicContentWrapperStep4);
        var that = this;
        if (!this.type) {
            return;
        }

        stepDR.html('');
        var currentMaterials = MATERIALS[this.type.key];
        currentMaterials.forEach(function (material, index) {
            var localHtml = '';
            localHtml += '<div class="itemForStep4 '+ material.key + '">';
                localHtml += '<p class="material-title">' + material.name + '</p>';
            localHtml += '</div>';

            var dr = $(localHtml);
            stepDR.append(dr);
            dr.on('click.collector', function () {
                $('.itemForStep4').removeClass('active');
                $('.scroll-wrp').fadeOut();
                $(this).addClass('active');
                var findClass = $(this).attr("class").split(" ", 2);
                var activeClass = findClass[1];
                $('.' + activeClass + '-scroll').fadeIn();
                that.material = currentMaterials[index];
            });
            // dr.on('mouseenter.collector', function () {
            //     $('.scroll-wrp').hide();
            //     var findClass = $(this).attr("class").split(" ", 2);
            //     var activeClass = findClass[1];
            //     $('.' + activeClass + '-scroll').show();
            //     that.material = currentMaterials[index];
            // });
            // dr.on('mouseleave.collector', function () {
            //     $('.scroll-wrp').hide();
            //     var findClass = $(this).attr("class").split(" ", 2);
            //     var activeClass = findClass[1];
            //     $('.' + activeClass + '-scroll').show();
            //     that.material = currentMaterials[index];
            // });

        });
    }




    window.Collector = Collector;
})();
