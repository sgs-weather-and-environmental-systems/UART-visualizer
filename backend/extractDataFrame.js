var extractDataFrame = function(dataframe_in) {
	var dataframe_process = dataframe_in.slice(0, Params.total_payload_size_bytes);
	if (initComplete === true && in_process1 === false && onPlotsTab == true && tprocess1) {
		dataFrameQueue.push(dataframe_process);
	}
	var dataframe_out = dataframe_in.slice(Params.total_payload_size_bytes, dataframe_in.length);
	return dataframe_out;
}