const prevButton = $('a[href="#previous"]');
const nextButton = $('a[href="#next"]');

let menuCounter = 0;

prevButton.click(function() {
    menuCounter--;
    console.log('Prev! New counter value is ${menuCounter}')
    // const title = titleInput.value
    // window.electronAPI.setTitle(title)
});

nextButton.click(function() {
    menuCounter++;
    console.log('Next! New counter value is ${menuCounter}')
    // const title = titleInput.value
    // window.electronAPI.setTitle(title)
});