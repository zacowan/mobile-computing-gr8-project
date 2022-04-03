"""Listens to messages broadcasted by Atlas. Works for zach_Atlas_IoTDDL.xml"""
import socket
import struct

MULTICAST_ADDRESS = "232.1.1.1"
MULTICAST_PORT = 1235


def main():
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind((MULTICAST_ADDRESS, MULTICAST_PORT))

    group = socket.inet_aton(MULTICAST_ADDRESS)
    mreq = struct.pack('4sL', group, socket.INADDR_ANY)
    sock.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, mreq)

    while True:
        data, addr = sock.recvfrom(1024)
        print("received message: %s" % data)


if __name__ == "__main__":
    main()
