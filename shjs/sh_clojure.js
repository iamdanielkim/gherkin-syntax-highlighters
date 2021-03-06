if (! this.sh_languages) {
  this.sh_languages = {};
}
sh_languages['clojure'] = [
  [
    [
      /;/g,
      'sh_comment',
      1
    ],
    [
      /\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,
      'sh_number',
      -1
    ],
    [
      /"/g,
      'sh_string',
      2
    ],
    [
      /\b(?:int|byte|boolean|char|long|float|double|short|void)\b/g,
      'sh_type',
      -1
    ],
    [
      /\b(?:defn|defrecord|defmacro|defmulti|defmethod|def|deftype|defprotocol|if|when|case|cond|loop|recur|fn|ns|import|require|use)\b/g,
      'sh_keyword',
      -1
    ],
    [
      /\b(?:println|doc|pprint|print|get|assoc|cons|conj|first|last|rest|dissoc|type|class)\b/g,
      'sh_predef_func',
      -1
    ],
    [
      /~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\||\{|\}|\[|\]/g,
      'sh_symbol',
      -1
    ]
  ],
  [
    [
      /$/g,
      null,
      -2
    ]
  ],
  [
    [
      /"/g,
      'sh_string',
      -2
    ],
    [
      /\\./g,
      'sh_specialchar',
      -1
    ]
  ]
];
