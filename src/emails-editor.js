import '../scss/emails-editor.scss';

const emailsEditor = (root, options) => {
  let emailsList = [];
  root.innerHTML = `
    <div class='emails-editor__heading'>
      Share <strong>${options.title}</strong> with other 
    </div>
    <div class='emails-editor__input-block'>
      <textarea 
        rows="1" 
        spellcheck="false"
        autocomplete="false"
        autocapitalize="off"
        autocorrect="off" 
        placeholder="add more people..." 
        class="emails-editor__add-input"></textarea>
    </div>
    <div class="emails-editor__button-block">
      <button class="emails-editor__button" id="add-random-email">Add email</button>
      <button class="emails-editor__button" id="get-email-count">Get email count</button>
    </div>
  `;

  const emailInput = document.querySelector('.emails-editor__add-input');
  const getEmailCountButton = document.getElementById('get-email-count');
  const addRandomEmail = document.getElementById('add-random-email');

  const emailValidator = email => {
    if (email.includes('@') && email.includes('.')) {
      return true;
    } else {
      return false;
    }
  };

  const removeEmailByIndex = e => {
    const emailName = e.target.parentNode.firstChild.innerHTML;
    const indexInEmailList = emailsList.indexOf(emailName);
    const { setId } = e.target.parentNode.dataset;
    const inputBlockSelector = document.querySelector(
      '.emails-editor__input-block'
    );

    inputBlockSelector.childNodes.forEach(i => {
      if (
        i.className === 'emails-editor__email-block' &&
        i.dataset.setId === setId
      ) {
        inputBlockSelector.removeChild(i);
      }
    });
    emailsList.splice(indexInEmailList, 1);
  };

  const addEmail = item => {
    const isEmail = emailValidator(item);
    const inputBlockSelector = document.querySelector(
      '.emails-editor__input-block'
    );
    const timeNow = Date.now();
    // Add new email to email list and page
    emailsList.push(item);
    const emailBlockElement = document.createElement('div');
    emailBlockElement.className = 'emails-editor__email-block';
    if (!isEmail)
      emailBlockElement.style =
        'text-decoration: underline;text-decoration-color: red;';

    // Do unique id
    emailBlockElement.dataset.setId = timeNow;

    // Insert internal elements
    emailBlockElement.innerHTML = `<div>${item}</div><div class='emails-editor__close-icon'></div>`;

    // Assign remove event
    const emailBlockChildNodes = emailBlockElement.childNodes;
    emailBlockChildNodes[
      emailBlockChildNodes.length - 1
    ].onclick = removeEmailByIndex;

    // Put new email block into emial list
    if (inputBlockSelector.lastChild.previousSibling) {
      inputBlockSelector.insertBefore(
        emailBlockElement,
        inputBlockSelector.lastChild.previousSibling
      );
    } else {
      inputBlockSelector.insertBefore(
        emailBlockElement,
        inputBlockSelector.lastChild
      );
    }

    emailInput.value = '';
  };

  const removeLastEmail = () => {
    const emailsBlockElementList = document.querySelector(
      '.emails-editor__email-block'
    );

    // Get list of nodes with class name equals to .emails-editor__email-block
    const emailBlockNodeList = document.querySelectorAll(
      '.emails-editor__email-block'
    );

    const parent = emailsBlockElementList.parentElement;

    parent.removeChild(emailBlockNodeList[emailBlockNodeList.length - 1]);
    emailsList.splice(emailsList.length - 1, 1);
  };

  const onKeyPress = e => {
    const key = e.which || e.keyCode;
    const { value } = e.target;

    // Add email after press 'Enter' or comma
    if (key === 13 || key === 188) {
      e.preventDefault(); // For avoid moving on new line after tap enter
      addEmail(value);
    }

    // Remove email after press 'Backspace'
    if (key === 8 && emailInput.value === '') {
      removeLastEmail();
    }
  };

  const onFocusOver = e => {
    const { value } = e.target;
    if (value !== '' && value !== null && value !== undefined) addEmail(value);
  };

  const onPaste = e => {
    let paste = (e.clipboardData || window.clipboardData).getData('text');
    emailInput.value = paste;
    paste.split(',').forEach(i => {
      addEmail(i);
    });
    e.preventDefault();
  };

  const getEmailCount = () => {
    // Show a current amount of emails in list
    alert(`Emails count ${emailsList.length}`);
  };

  const getRandomEmail = async () => {
    fetch('./emails-list.json').then(res => console.log(res.json()))
  };

  getEmailCountButton.addEventListener('click', getEmailCount);
  addRandomEmail.addEventListener('click', getRandomEmail);
  emailInput.addEventListener('keydown', onKeyPress, false);
  emailInput.addEventListener('blur', onFocusOver);
  emailInput.addEventListener('paste', onPaste);
};

export const run = emailsEditor;
