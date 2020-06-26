


$(window).on('resize', setPlaceholder);
window.addEventListener('load', setPlaceholder);



$('input,textarea').focus(function () {

  $(this).attr('placeholder', '');
});
$('input,textarea').blur(function () {
  if ($('body').innerWidth() > 760) {
    $(this).attr('placeholder', $(this).attr('placeholder_web'));
  } else {
    $(this).attr('placeholder', $(this).attr('placeholder_mob'));
  }
});


var GHOST_ELEMENT_ID = '__autosizeInputGhost'

var characterEntities = {
  ' ': 'nbsp',
  '<': 'lt',
  '>': 'gt',
  '\n': '<br>'
}
function mapSpecialCharacterToCharacterEntity(specialCharacter) {
  return '&' + characterEntities[specialCharacter] + ';'
}
function escapeSpecialCharacters(string) {
  return string.replace(/\s|<|>/g, mapSpecialCharacterToCharacterEntity)
}

// Create `ghostElement`, with inline styles to hide it and ensure that the text is all
// on a single line.
function createGhostElement() {
  var ghostElement = document.createElement('div')
  ghostElement.id = GHOST_ELEMENT_ID
  ghostElement.style.cssText =
    'display:inline-block;overflow:hidden;position:absolute;top:0;visibility:hidden;white-space:pre-wrap;'
  document.body.appendChild(ghostElement)
  return ghostElement
}

let autosizeInput = function (element, options) {
  var elementStyle = window.getComputedStyle(element);
  // prettier-ignore
  var elementCssText = 'box-sizing:' + elementStyle.boxSizing +
    ';border-left:' + elementStyle.borderLeftWidth + ' solid red' +
    ';border-right:' + elementStyle.borderRightWidth + ' solid red' +
    ';font-family:' + elementStyle.fontFamily +
    ';font-feature-settings:' + elementStyle.fontFeatureSettings +
    ';font-kerning:' + elementStyle.fontKerning +
    ';font-size:' + elementStyle.fontSize +
    ';line-height:' + elementStyle.lineHeight +
    ';font-stretch:' + elementStyle.fontStretch +
    ';font-style:' + elementStyle.fontStyle +
    ';font-variant:' + elementStyle.fontVariant +
    ';font-variant-caps:' + elementStyle.fontVariantCaps +
    ';font-variant-ligatures:' + elementStyle.fontVariantLigatures +
    ';font-variant-numeric:' + elementStyle.fontVariantNumeric +
    ';font-weight:' + elementStyle.fontWeight +
    ';letter-spacing:' + elementStyle.letterSpacing +
    ';margin-left:' + elementStyle.marginLeft +
    ';margin-right:' + elementStyle.marginRight +
    ';padding-left:' + elementStyle.paddingLeft +
    ';padding-right:' + elementStyle.paddingRight +
    ';text-indent:' + elementStyle.textIndent +
    ';text-transform:' + elementStyle.textTransform

  // Assigns an appropriate width to the given `element` based on its contents.
  function setWidth() {
    if (element.tagName == 'SELECT') {
      var string = element.value == "" ? element.querySelector('option[selected]').textContent : element.value;
    } else {
      var string = element.value || element.getAttribute('placeholder') || ' ';
    }
    // Check if the `ghostElement` exists. If no, create it.
    var ghostElement =
      document.getElementById(GHOST_ELEMENT_ID) || createGhostElement()
    // Copy all width-affecting styles to the `ghostElement`.
    ghostElement.style.cssText += elementCssText
    ghostElement.innerHTML = escapeSpecialCharacters(string)
    // Copy the width of `ghostElement` to `element`.
    var width = window.getComputedStyle(ghostElement).width
    element.style.width = width
    // return width

    var height = window.getComputedStyle(ghostElement).height
    element.style.height = height
    return {
      width,
      height
    }

  }
  window.addEventListener('load', setWidth)
  element.addEventListener('focus', setWidth)
  element.addEventListener('input', setWidth)
  element.addEventListener('blur', setWidth)

  var width = setWidth()



  // Set `min-width` only if `options.minWidth` was set, and only if the initial
  // width is non-zero.
  if (options && options.minWidth && width !== '0px') {
    element.style.minWidth = width
  }

  // Return a function for unbinding the event listener and removing the `ghostElement`.
  return function () {
    element.removeEventListener('input', setWidth)
    var ghostElement = document.getElementById(GHOST_ELEMENT_ID)
    if (ghostElement) {
      ghostElement.parentNode.removeChild(ghostElement)
    }
  }

}





$(window).on('load', function () {
  autosizeInput(document.querySelector('#task_name'));
  autosizeInput(document.querySelector('#task_company'));
  autosizeInput(document.querySelector('#task_email'));
  autosizeInput(document.querySelector('#task_msg'));
  // autosizeInput(document.querySelector('#task_source'));
  // autosizeInput(document.querySelector('#task_purpose'));

});

$(window).on('resize', function () {
  autosizeInput(document.querySelector('#task_name'));
  autosizeInput(document.querySelector('#task_company'));
  autosizeInput(document.querySelector('#task_email'));
  autosizeInput(document.querySelector('#task_msg'));
  // autosizeInput(document.querySelector('#task_source'));
  // autosizeInput(document.querySelector('#task_purpose'));

});

