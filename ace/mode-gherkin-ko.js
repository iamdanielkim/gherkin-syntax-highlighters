define('ace/mode/gherkin-ko', function(require, exports, module) {

var oop = require("../lib/oop");
var TextMode = require("ace/mode/text").Mode;
var Tokenizer = require("ace/tokenizer").Tokenizer;
var MatchingBraceOutdent = require("ace/mode/matching_brace_outdent").MatchingBraceOutdent;
var Range = require("ace/range").Range;
var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;
var GherkinHighlightRules = function()
{
    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : "^\\s*#.*$"
            }, 
            {
                token : "comment.doc.tag",
                regex : "@[^@\\\r\\\n\\\t ]+" 
            },
            {
                token : "keyword.with_children",
                regex : "^\\s*(?:예|시나리오 개요|시나리오|배경|기능):",
            },
            {
                token : "keyword",
                regex : "^\\s*(?:단|하지만|그리고|그러면|만약|만일|먼저|조건|\\* )"
            },
            {
                token : "string",           // multi line """ string start
                regex : '^\\s*"{3}.*$',
                next : "qqstring"
            },
        ],
        "qqstring" : [ {
                token : "string", // multi line """ string end
                regex : '(?:[^\\\\]|\\\\.)*?"{3}',
                next : "start"
            }, {
                token : "string",
                regex : '.+'
            }
        ]
    };
};

oop.inherits(GherkinHighlightRules, TextHighlightRules);

var Mode = function()
{
    this.$tokenizer = new Tokenizer(new GherkinHighlightRules().getRules());
    this.$outdent = new MatchingBraceOutdent();
};
oop.inherits(Mode, TextMode);

(function()
{
    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);
        var tokenizedLine = this.$tokenizer.getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
        if (tokens.length && tokens[0].type == "keyword.with_children") {
            indent += tab;
        }
        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };
    
}).call(Mode.prototype);

exports.Mode = Mode;

});
