import $ from 'jquery';

import { onLoadHtmlSuccess } from '../core/includes';

const duration = 30;

function filterBtCity(city) {
    $('[wm-city]').each(function(index, element) {
        const isTarget = ($(this).attr('wm-city') === city) || (city === null);

        if (isTarget){
            $(this).parent().removeClass('d-none');
            $(this).fadeIn(duration);
        }
        else {
            $(this).fadeOut(duration, () => {
                $(this).parent().removeClass('d-none');
            });  
        }      
    });
}

$.fn.cityButtons = function() {
    const cities = new Set;

    $('[wm-city]').each(function(index, element) {
        cities.add($(element).attr('wm-city'));
    });

    const buttons = Array.from(cities).map(city => {
        const button = $('<button>').addClass(['btn', 'btn-info']).html(city);
        button.click(event => filterBtCity(city));
        return button;
    });

    const buttonAll = $('<button>').addClass(['btn', 'btn-info', 'active']).html('All');
    buttonAll.click(event => filterBtCity(null));
    buttons.push(buttonAll);

    const buttonGroup = $('<div>').addClass(['btn-group']);
    buttonGroup.append(buttons);

    $(this).html(buttonGroup);
    return this;
}

onLoadHtmlSuccess(function() {
    $('[wm-city-buttons]').cityButtons();
});