# **Miro emails editor**

## **Without node js**

Download script **emails-editor.js** from folder **dist**

Then paste this script into your existing code, before the `<body>` closes. Like this:

    <script src="dist/emails-editor.js"></script>

    <script>
      const options = {
        title: 'Miro Task'
      };
      const container = document.querySelector('#emails-editor');
      EmailsEditor.run(container, options);
    </script>

**Options** receive the value **title**, which will be written on heading

After that you should paste block inside `<body>` with **id** equals to **emails-editor**:

    <div id="emails-editor"></div>

## **With help of NPM**

Install

`npm install https://github.com/AskhatB/miroTask.git`

Import

`import EmailEditor from 'miro-email-editor/dist/emails-editor'`
