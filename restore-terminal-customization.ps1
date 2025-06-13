# Uses windows forms to send keystrokes to customize vscode Terminals
Add-Type -AssemblyName System.Windows.Forms
$tabDelay = .6

# Last Terminal 
[System.Windows.Forms.SendKeys]::SendWait("^k^+%cRed~")

# Second to last Terminal
[System.Windows.Forms.SendKeys]::SendWait("^{PGUP}"); Start-Sleep -s $tabDelay
[System.Windows.Forms.SendKeys]::SendWait("^k^+%cYellow~")

# Third to last Terminal
[System.Windows.Forms.SendKeys]::SendWait("^{PGUP}"); Start-Sleep -s $tabDelay
[System.Windows.Forms.SendKeys]::SendWait("^k^+%cMagenta~")