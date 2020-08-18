#!/bin/bash
dpkg-query -f 'Package: ${binary:Package}\nStatus: ${Status}\nPriority: ${Priority}\nSection: ${Section}\nDepends: ${Depends}\nDescription: ${Description}\n\n' -W > status.real
sed -i '/^Depends: $/d' status.real
