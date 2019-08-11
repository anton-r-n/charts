BUILD=./build
STATIC=$(BUILD)/static

JS_TARGET=$(STATIC)/app.js
JS_TARGET_MIN=$(STATIC)/app.min.js
JS_TEST_TARGET=$(STATIC)/app_test.js
CSS_TARGET=$(STATIC)/app.css
HTML_TARGET=$(BUILD)/app.html
HTML_TEST_TARGET=$(STATIC)/app_test.html
ICON_TARGET=$(STATIC)/img/favicon.ico
MOCK_TARGET=$(STATIC)/mock.js

all: js css html tests mock
js: $(JS_TARGET)
css: $(CSS_TARGET)
html: $(HTML_TARGET) $(ICON_TARGET)
mock: $(MOCK_TARGET)
min: $(JS_TARGET_MIN)
tests: $(JS_TEST_TARGET) $(HTML_TEST_TARGET)

SOURCE=./client

JS_FILES=$(shell find $(SOURCE) -type f -name '*.js' ! -name '*_test.js')
JS_TEST_FILES=$(shell find $(SOURCE) -type f -name '*_test.js')
MOCK_FILES=$(shell find ./mock -type f -name '*.js')
CSS_FILES=$(shell find $(SOURCE) -type f -name '*.css')
HTML_FILES=$(SOURCE)/app.html
HTML_TEST_FILES=$(SOURCE)/app_test.html
ICON_FILE=$(SOURCE)/favicon.ico

$(JS_TARGET): $(JS_FILES)
	@mkdir -p $(dir $@)
	@echo "'use strict';" > $@;
	@for f in $^; do printf "\n\n/* %s */\n\n" $$f >> $@; cat $$f >> $@; done
	@gzip -fk $@
	@echo 'done:' $@

$(JS_TEST_TARGET): $(JS_TEST_FILES)
	@mkdir -p $(dir $@)
	@echo "'use strict';" > $@;
	@for f in $^; do printf "\n\n/* %s */\n\n" $$f >> $@; cat $$f >> $@; done
	@gzip -fk $@
	@echo 'done:' $@

$(CSS_TARGET): $(CSS_FILES)
	@mkdir -p $(dir $@)
	@echo "/* Styles */" > $@;
	@for f in $^; do printf "\n\n/* %s */\n\n" $$f >> $@; cat $$f >> $@; done
	@gzip -fk $@
	@echo 'done:' $@

$(HTML_TARGET): $(HTML_FILES)
	@mkdir -p $(dir $@); cp $^ $@; echo 'done:' $@

$(HTML_TEST_TARGET): $(HTML_TEST_FILES)
	@mkdir -p $(dir $@); cp $^ $@; echo 'done:' $@

$(ICON_TARGET): $(ICON_FILE)
	@mkdir -p $(dir $@); cp $^ $@; echo 'done:' $@

$(JS_TARGET_MIN): $(JS_TARGET)
	@uglifyjs -c reduce_funcs=false,inline=false -m --mangle-props regex=/_$$/ $^ > $@
	@gzip -fk $@
	@echo 'done:' $@

$(MOCK_TARGET): $(MOCK_FILES)
	@mkdir -p $(dir $@)
	@echo "'use strict';" > $@;
	@for f in $^; do printf "\n\n/* %s */\n\n" $$f >> $@; cat $$f >> $@; done
	@gzip -fk $@
	@echo 'done:' $@

.PHONY: hint lint style clean wc

hint:
	@jshint $(JS_FILES) $(JS_TEST_FILES)

lint:
	@eslint $(JS_FILES)

clean:
	rm -rf $(BUILD)/*

wc:
	@echo '\nHTML'; wc -lc $(HTML_FILES)
	@echo '\nCSS'; wc -lc $(CSS_FILES)
	@echo '\nJS'; wc -lc $(JS_FILES)
