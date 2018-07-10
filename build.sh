 #!/bin/bash
#   For build/deployment, to open Panel within adobe, this scrript,for mac, 
#  moves content of this app to Adobe Premiere extension folder
#  
#  giving persmission to script if needed
#  https://askubuntu.com/questions/409025/permission-denied-when-running-sh-scripts
#  chmod +x the_file_name
 
# makes directory if not present
mkdir -p ~/Library/Application\ Support/Adobe/CEP/extensions/
# copies content of current directory into extnesion folder
cp -R $PWD ~/Library/Application\ Support/Adobe/CEP/extensions/