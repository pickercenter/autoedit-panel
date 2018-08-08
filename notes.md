app.openFCPXML(fileToOpen:string)
http://www.brysonmichael.com/premiereapi/openfcpxml


app.sourceMonitor.openFilePath(fileToOpen.fsName);
app.sourceMonitor.play(1.73); 
https://github.com/Adobe-CEP/Samples/blob/master/PProPanel/jsx/PPRO/Premiere.jsx#L249


searchForBinWithName
https://github.com/Adobe-CEP/Samples/blob/master/PProPanel/jsx/PPRO/Premiere.jsx#L260


<!-- This could be used to reconnect an EDL -->
replaceMedia
firstProjectItem.changeMediaPath(replacementMedia.fsName, forceAttempt);
https://github.com/Adobe-CEP/Samples/blob/master/PProPanel/jsx/PPRO/Premiere.jsx#L351


create a sequence
https://github.com/Adobe-CEP/Samples/blob/master/PProPanel/jsx/PPRO/Premiere.jsx#L441

<!--  -->
you can use the openInSource function in the example to open a file from the computer

in our panel premiere.jsx this code seeks to the position you definte
definte

         app.enableQE(); // enables the undocumented QE DOM which is necessary to control program monitor playback
        //it scrubs the playhead to the string given
        qe.source.player.startScrubbing();
        //pos is in the format of seconds.frames (e.g. 10.5 is 10 seconds, 5 frames) or in timecode (‘00;00;10;05’)
        // its commented in the source for the panel my source
        // right now if you enter in 10.5 it will sync the source and the active sequence to that point
        qe.source.player.scrubTo(String(pos));
        qe.source.player.endScrubbing();

        app.sourceMonitor.play(1.0) // argument playback speed


        source is source monitor
        active sequence plays back in the program monitor
        in default view the source monitor is left and program is right
        If you double click a clip to select and open the extension it should work correctly


- get media file and a timecode as input 
- play the media file in the source monitor from that time code onwards