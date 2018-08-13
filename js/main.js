var markInstance

const fuzzysort = cep_node.require('fuzzysort')

function traverse() {
    window.__adobe_cep__.evalScript("$._PPP.traverse_project_items()", callback);
}
function callback(data) {
    if (!data || data.length < 0) return;
    try {
        var file_paths = JSON.parse(data);
        console.log(file_paths);
        document.getElementById("result").innerHTML = file_paths;
    } catch(error) {
        console.log(error);
    }
}
function createSeq(){
    console.log("Creating!")
    window.__adobe_cep__.evalScript("$._PPP.create_sequence()", log);

}
function setSourcePos(pos){
    // let pos = '(' + document.getElementById("pos-input").value + ')'
    window.__adobe_cep__.evalScript(`$._PPP.set_source_pos(${pos})`, log);
}
function log(data){
    console.log(data)
}

window.onload = function(){
    var keywordInput = document.querySelector("input[name='keyword']");
    markInstance = new Mark(document.querySelector(".context"));

    document.getElementById('autoEditJsonInput').addEventListener('change', handleFileSelect);
    document.getElementById('transcription-text').addEventListener('click', handleWordClick);
    // keywordInput.addEventListener("input", performMark);

}

function performMark(input) {

    console.log("performing highlight")
    // Read the keyword
    var keyword = input || document.querySelector("input[name='keyword']").value;

    var options = {
        acrossElements: true,
        separateWordSearch: false,
        element: "span",
        className: "highlight"
    }

    // Remove previous marked elements and mark
    // the new keyword inside the context
    markInstance.unmark({
        done: function(){
        markInstance.mark(keyword, options);
    }
    });
}

function parseText(text){
    var result = ""
    text.forEach((p)=>{
        var startTime = "" 
        if (p.paragraph[0].line[0]){
            var time = p.paragraph[0].line[0].startTime
            var formatted = fmtMSS(Math.floor(time))
            var minutes = Math.floor(time / 60);
            var seconds = Math.floor(time - minutes * 60);

            startTime = `<span class='words' data-start-time='${time}'>[${formatted}]`
        }

        result+= `<h4>${p.speaker} ${startTime}</h4>`

        p.paragraph.forEach((l)=>{
            result+='<p>'
            l.line.forEach((w)=>{
                result+=`<span class='words' data-start-time='${w.startTime}'>${w.text} </span>`;
            })
            result+='</p>'
        })
    })
    return result
}

// Seconds to formatted time 
function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}


function fuseSearch(){
    var options = {
        keys: ['paragraph.line.text'],
        threshold: 0.2,
        tokenize: true,
        };
        var fuse = new Fuse(window.transcript.text, options)
        var keyword = document.querySelector("input[name='fuse-keyword']").value
        var searchOutput = fuse.search(keyword)


        window.searchOutput = searchOutput
        
        console.log(searchOutput)

        var parsed = parseText(searchOutput)
        
        document.getElementById('transcription-text').innerHTML = parsed;
        performMark(keyword)
                            
    }

    function fuzzySearch(){
        var keyword = document.querySelector("input[name='fuzzy-keyword']").value
        var searchOutput = []

        window.transcript.text.forEach((p)=>{
            p.paragraph.forEach((l)=>{
                if(l.string){
                    var sorted = fuzzysort.single(keyword, l.string)
                    if (sorted && sorted.score > -1500){
                        searchOutput.push(p)
                    }
                }
            })
        })

        window.searchOutput = searchOutput
        
        console.log(searchOutput)

        var parsed = parseText(searchOutput)
        
        document.getElementById('transcription-text').innerHTML = parsed;
        performMark(keyword)
                            
    }

    function includesSearch(){
        var keyword = document.querySelector("input[name='includes-keyword']").value
        var searchOutput = []

        window.transcript.text.forEach((p)=>{
            p.paragraph.forEach((l)=>{
                if(l.string){
                    if (l.string.includes(keyword)){
                        searchOutput.push(p)
                    }
                }
            })
        })

        window.searchOutput = searchOutput
        
        console.log(searchOutput)

        var parsed = parseText(searchOutput)
        
        document.getElementById('transcription-text').innerHTML = parsed;
        performMark(keyword)
                            
    }

function handleFileSelect(evt){
    var files = evt.target.files;
    // console.log(e.target.files[0])
    // var reader = new FileReader();
    // var fileContent = reader.readAsText(e.target.files[0]);
    // console.log(fileContent);

    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function(file) {
    return function(e) {
        // do something with the result
        // console.log(e.target.result)
        var transcript = JSON.parse(e.target.result)
        window.transcript = transcript;
        displayTranscript(transcript);
        window.transcript.text.forEach((p)=>{
            p.paragraph.forEach((l)=>{
                l.string = ""
                l.line.forEach((w)=>{
                    l.string+=`${w.text} `;
                })
            })
        })
    };
    })(files[0]);

    // Read in the image file as a data URL.
    reader.readAsText(files[0]);
}

function displayTranscript(transcript){
    // var transcript = JSON.parse(transcript);
    // var result = "";
    // // to identify matching text 
    // // transcript.metadata.filePathName;
    // // transcript.metadata.fileName;
    // transcript.text.forEach((p)=>{
    // 	result+= "<h4>"+p.speaker + "</h4>"
    // 	p.paragraph.forEach((l)=>{
    // 		result+='<p>'
    // 		l.line.forEach((w)=>{
    // 			result+=`<span class='words' data-start-time='${w.startTime}'>${w.text} </span>`;
    // 		})
    // 		result+='</p>'
    // 	})
    // })

    var parsed = parseText(transcript.text)
    
    document.getElementById('transcription-text').innerHTML = parsed;
}

function resetTrascript(){
    displayTranscript(window.transcript)
}

function handleWordClick(evt){
    // setSourcePos(evt.target.data.)
    var startTime

    console.log(evt.target.innerHTML);//check if is "words"
    startTime = evt.target.dataset.startTime
    
    // Check if word is highlighted and get data from parent element if necessary
    if( !evt.target.dataset.startTime ){
        startTime = evt.target.parentElement.dataset.startTime
    }

    console.log(startTime);
    
    // Get converted time into secs.frames format
    var frameTime = secondsToFrames(startTime) 
    console.log("Word Time: "+ startTime + ", Frame Time: " + frameTime)
    if (startTime) setSourcePos(frameTime);
}

function secondsToFrames(time){
    var buffer = 3 // amount of frames to jump before the start of the word to make it a little less abrupt
    let fps = 25;
    var base = Math.floor(time)
    var fraction = time - base
    var frames = Math.floor(fps * fraction) - buffer
    if (frames < 1){
        frames = fps + frames 
        base -= 1; 
    }
    return String(base) + '.' + String(frames)
}