#created by Bharat Mallapur (bharatontech@gmail.com)

#shows which process is using the port 3000
lsof -i :3000
#in this case, we know it's node, so kill node directly! use with caution!
# sudo killall -9 node