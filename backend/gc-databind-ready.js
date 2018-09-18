/*
*  Boilerplate code for creating computed data bindings
*/
document.addEventListener('gc-databind-ready', function() {
	gc.databind.registry.getBinding('CFG_port.$rawData').addStreamingListener(cmd_sender_listener);
	gc.databind.registry.getBinding('DATA_port.$rawData').addStreamingListener({
		onDataReceived: function(data) {
			if (data) {
				//console.log('  ... $rawData !! ' + (data ? data.length : 'nothing'));
				if (Params) {
					var numDataFrameAdded = 0;
					// start with saving the data, if user has requested it
					saveStreamData(data);
					//Now check if we append to dataframe or create a new dataframe
					if (dataframe) {
						Array.prototype.push.apply(dataframe, data);
					} else {
						if (data.length >= 8 + 4 + 4 && isMagic(data, 0)) {
							dataframe = data.slice(0);
						}
					}
					// Now split the accumulated dataframe into bytevec that can be given to process1
					while (dataframe.length > 0) {
						// start of the remainder dataframe should start with magic else drop the accumulated frame
						if (dataframe.length >= 8 + 4 + 4 && isMagic(dataframe, 0)) {
							Params.total_payload_size_bytes = totalFrameSize(dataframe, 8+4);
						} else {
							dataframe = [];
							Params.total_payload_size_bytes = 0;
						}
						if (dataframe.length >= Params.total_payload_size_bytes) {
							// this function will push one bytevec worth of data to the queue and return remaining bytes 
							dataframe = extractDataFrame(dataframe);
							numDataFrameAdded++;
						}
						else {
							break;
						}
					}
					// Now check if we have bytevec's queued up
					if (dataFrameQueue.length > 0 && initComplete === true) {
						if (in_process1 === false && onPlotsTab == true && tprocess1) {
							try {
								var cnt;
								if (Params.plot) {
									if (Params.plot.dataFrames>0) {
										gatherParamStats(Params.plot.dataStats,getTimeDiff(dataframe_start_ts));
									}
									dataframe_start_ts = getTimeDiff(0);
									Params.plot.dataFrames++;
								}
								in_process1 = true;
								//if we added more than one bytevec in this run, we should queue it up for process1
								//else let data interrupts help drain the queue
								for (cnt = 0; cnt < numDataFrameAdded; cnt++) { 
									var dataframe_process = dataFrameQueue.shift();
									if (dataframe_process && dataframe_process.length>0) {
										tprocess1(dataframe_process);
									}
								}
							} finally {
								in_process1 = false; // need to refactor, the global Params is not a good idea. we may hit exception when changing global Params and so in_process1 never flipped to false
							}
						}
					}
				}
			}
		}
	});
	extendAboutBox();
});