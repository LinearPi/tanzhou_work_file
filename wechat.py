import itchat
import os, codecs
from itchat.content import *
from time import strftime

FILENAME = strftime("%Y-%m-%d") + ".txt"
PATH = r"D:/"
if os.path.exists(PATH) == False:
    os.makedirs(PATH)

# fp = codecs.open(PATH + FILENAME, "a", "utf-8")

def writeText(textTemp):
    with open(PATH + FILENAME, 'a') as f:
        f.write(textTemp)
        f.close()

newInstance = itchat.new_instance()
newInstance.auto_login(hotReload=True, statusStorageDir='newInstance.pkl')
itchat.auto_login(enableCmdQR=2, hotReload=True)


@itchat.msg_register([TEXT, MAP, CARD, NOTE, SHARING])
def text_send_test(msg):
    res = itchat.search_friends(
        userName=msg['FromUserName'])['NickName'] + ":" + msg['Text']
    writeText(res + "\n")
    # fp.write(res + "\n")
    print(res)


@itchat.msg_register(TEXT, isGroupChat=True)
def Gchat(msg):
    gres = "Group#" + msg['ActualNickName'] + ":" + msg['Text']
    writeText(gres + "\n")
    # fp.write(gres + "\n")
    print(gres)




@newInstance.msg_register(itchat.content.TEXT)
def reply(msg):
    return msg.text


if __name__ == "__main__":
    try:
        
        itchat.run()
        newInstance.run()
    except KeyboardInterrupt:
        itchat.logout()
