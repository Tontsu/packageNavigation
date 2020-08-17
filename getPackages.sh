#!/bin/bash
dpkg-query -f 'Package: ${binary:Package}\nStatus: ${Status}\nPriority ${Priority}\nSection ${Section}\nDescription: ${Description}\nDepends: ${Depends}\n\n' -W > status.real

