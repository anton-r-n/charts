(function(w) {
  var Data = w.Data = w.Data || {};

  Data.form = function() {
    return data;
  };

  var data = {
    'widget': 'Form',
    'meta': {
      'action': '',
      'class': 'loginForm',
      'enctype': 'application/json',
      'method': 'post',
      'title': 'Form Fields'
    },
    'nodes': [
      {
        'meta': {
          'label': 'User Name',
          'name': 'login',
          'type': 'text'
        },
        'widget': 'FormField'
      },
      {
        'meta': {
          'label': 'Password',
          'name': 'password',
          'type': 'password'
        },
        'widget': 'FormField'
      },
      {
        'meta': {
          'name': 'radio_dropdown',
          'label': 'Dropdown',
          'type': 'dropdown',
          'value': ['2']
        },
        'data': [
          {'label': 'The First Option', 'value': '0'},
          {'label': 'The Second Option', 'value': '1'},
          {'label': 'The Third Option', 'value': '2'},
          {'label': 'The Fourth Option', 'value': '3'},
          {'label': 'The Fifth Option', 'value': '4'}
        ],
        'widget': 'FormField'
      },
      {
        'meta': {
          'cls': 'inline',
          'name': 'checkbox_dropdown',
          'label': 'Dropdown 1',
          'type': 'dropdown',
          'multiple': true,
          'value': ['2', '4']
        },
        'data': [
          {'label': 'The First Option', 'value': '0'},
          {'label': 'The Second Option', 'value': '1'},
          {'label': 'The Third Option', 'value': '2'},
          {'label': 'The Fourth Option', 'value': '3'},
          {'label': 'The Fifth Option', 'value': '4'}
        ],
        'widget': 'FormField'
      },
      {
        'meta': {
          'render': 'inline',
          'name': 'radioButtons0',
          'label': 'Radio buttons inline',
          'type': 'options',
          'value': ['2']
        },
        'data': [
          {'label': 'Option 0', 'value': '0'},
          {'label': 'Option 1', 'value': '1'},
          {'label': 'Option 2', 'value': '2'}
        ],
        'widget': 'FormField'
      },
      {
        'meta': {
          'render': 'inline',
          'name': 'radioButtons1',
          'label': 'Radio buttons multiline',
          'type': 'options',
          'value': ['1']
        },
        'data': [
          {'label': 'Option 0', 'value': '0'},
          {'label': 'Option 1', 'value': '1'},
          {'label': 'Option 2', 'value': '2'},
          {'label': 'Option 3', 'value': '3'},
          {'label': 'Option 4', 'value': '4'},
          {'label': 'Option 5', 'value': '5'}
        ],
        'widget': 'FormField'
      },
      {
        'meta': {
          'name': 'radioButtons2',
          'label': 'Radio buttons block',
          'type': 'options',
          'value': ['2']
        },
        'data': [
          {'label': 'Option 0', 'value': '0'},
          {'label': 'Option 1', 'value': '1'},
          {'label': 'Option 2', 'value': '2'}
        ],
        'widget': 'FormField'
      },
      {
        'meta': {
          'name': 'checkboxes',
          'render': 'inline',
          'label': 'Checkboxes multiline',
          'type': 'options',
          'multiple': true,
          'value': ['3']
        },
        'data': [
          {'label': 'Option 0', 'value': '0'},
          {'label': 'Option 1', 'value': '1'},
          {'label': 'Option 2', 'value': '2'},
          {'label': 'Option 3', 'value': '3'},
          {'label': 'Option 4', 'value': '4'},
          {'label': 'Option 5', 'value': '5'}
        ],
        'widget': 'FormField'
      },
      {
        'meta': {
          'name': 'checkboxes1',
          'label': 'Checkboxes block',
          'type': 'options',
          'multiple': true,
          'value': ['3']
        },
        'data': [
          {'label': 'Option 0', 'value': '0'},
          {'label': 'Option 1', 'value': '1'},
          {'label': 'Option 2', 'value': '2'},
          {'label': 'Option 3', 'value': '3'},
          {'label': 'Option 4', 'value': '4'},
          {'label': 'Option 5', 'value': '5'}
        ],
        'widget': 'FormField'
      },
      {
        'meta': {
          'type': 'submit',
          'value': 'Save'
        },
        'widget': 'FormField'
      }
    ]
  };
})(this);
