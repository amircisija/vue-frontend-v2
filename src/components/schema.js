const fields = {
  "fields": [{
      "type": 'input',
      "inputType": 'text',
      "label": 'First Name',
      "model": 'firstname',
      "placeholder": 'Your first name',
      "required": true,
      "validator": ['string']
    },
    {
      "type": 'input',
      "inputType": 'text',
      "label": 'Last Name',
      "model": 'lastname',
      "placeholder": 'Your last name',
      "required": true,
      "validator": ['string']
    },
    {
      "type": "radios",
      "label": "Sex",
      "model": "gender",
      "values": [
        "Male",
        "Female"
      ],
      "required": true
    },
    {
      "type": "textArea",
      "label": "Message",
      "model": "message",
      "name": "message",
      "placeholder": "Your Message",
      "rows": 4,
      "required": true,
      "validator": ['string']
    },
    {
      "type": "select",
      "selectOptions": {
        noneSelectedText: 'Please Choose'
      },
      "label": "This message is confidential",
      "model": "confidential",
      "values": [
        "No",
        "Yes"
      ],
      "default": "No",
      "value": "No",
      "required": true,
      "validator": ['required'],
      visible: (model) => {
        if (model.message.length > 30) {
          return true;
        }
        return false;
      }
    },
    {
      "type": 'checkbox',
      "label": 'I accept the TOS',
      "model": 'terms',
      "default": true,
      "required": true,
      "validator": ['required'],
      visible: (model) => {
        if (model.message.length > 30 && model.confidential) {
          return true;
        }
        return false;
      }
    }
  ]
}
export default fields;
