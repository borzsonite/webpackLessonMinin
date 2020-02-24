import * as $ from 'jquery'

function createAnalytics() {
    let counter = 0
    let isDestroyed = false

    const listener = () => counter++

    // document.addEventListener('click', listener) без jquery
    $(document).on('click', listener); // заменили строчу выше на эту, с использванием jquery

    return {
        destroy() {
            // document.removeEventListener('click', listener)
            $(document).off('click', listener); // заменили строчу выше на эту, с использванием jquery

            isDestroyed = true
        },

        getClicks() {
            if (isDestroyed) {
                return `Analytics is destroyed. Total clicks = ${counter}`
            }
            return counter
        }
    }
}

window.analitics = createAnalytics();