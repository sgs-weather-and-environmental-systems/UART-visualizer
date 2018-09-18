var saveStreamStart = function(filename) {
	processedStream = streamSaver.createWriteStream(filename);
	streamWriter = processedStream.getWriter();
	savedStreamBytes = 0;
};

var saveStreamStop = function() {
	if (streamWriter) {
		streamWriter.close();
		streamWriter = null;
	}
};

var saveStreamAbort = function() {
	if (streamWriter) {
		streamWriter.abort('reason');
		streamWriter = null;
	}
};

var saveStreamData = function(data) {
	if (streamWriter) {
		if (savedStreamBytes == 0) {
			savedStreamStart = new Date().getTime();
		}
		streamWriter.write(data);
		savedStreamBytes += data.length;
		if (((new Date().getTime()) - savedStreamStart) > (parseInt(templateObj.$.ti_widget_textbox_record_time.getText()) * 1e3)) {
			templateObj.$.ti_widget_button_record.label = 'Record Start';
			saveStreamStop();
			updateToast('Recording has been stopped as time limit has reached');
		}
		if (savedStreamBytes >= (parseFloat(templateObj.$.ti_widget_textbox_record_file_size_limit.getText()) * 1024 * 1024)) {
			templateObj.$.ti_widget_button_record.label = 'Record Start';
			saveStreamStop();
			updateToast('Recording has been stopped as size limit has reached');
		}		
	}
};