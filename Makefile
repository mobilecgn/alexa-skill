.PHONY: build

build:
	yarn run build
	mkdir build/node_modules
	cp -r node_modules/alexa-sdk \
			node_modules/i18next \
			node_modules/i18next-sprintf-postprocessor \
			build/node_modules/
	cp -r node_modules/meetup-api \
			node_modules/asynckit \
			node_modules/superagent \
			node_modules/debug \
			node_modules/ms \
			node_modules/formidable \
			node_modules/form-data \
			node_modules/combined-stream \
			node_modules/delayed-stream \
			node_modules/mime \
			node_modules/mime-db \
			node_modules/mime-types \
			node_modules/methods \
			node_modules/extend \
			node_modules/qs \
			node_modules/cookiejar \
			node_modules/websocket-stream \
			node_modules/ws \
			node_modules/ultron \
			node_modules/options \
			node_modules/through2 \
			node_modules/process-nextick-args \
			node_modules/isarray \
			node_modules/buffer-shims \
			node_modules/util-deprecate \
			node_modules/xtend \
			node_modules/duplexify \
			node_modules/end-of-stream \
			node_modules/wrappy \
			node_modules/stream-shift \
			node_modules/JSONStream \
			node_modules/jsonparse \
			node_modules/through \
			node_modules/core-util-is \
			node_modules/readable-stream \
			node_modules/event-stream \
			node_modules/from \
			node_modules/inherits \
			node_modules/duplexer \
			node_modules/map-stream \
			node_modules/pause-stream \
			node_modules/split \
			node_modules/stream-combiner \
			node_modules/oauth \
			node_modules/superagent-oauth \
			build/node_modules/
	cd build && zip -r ../build.zip index.js node_modules
