#!/usr/bin/env bash

echo U2FsdGVkX1+75DRt/Y01ZXdDEZzrscM41DvlkR9RMklJVK2I5PlYxYSbd0TBZ4PrMy4FPz9tJMVi2GTohxxdrg== | openssl enc -aes-128-cbc -a -d -salt -pass pass:valorkin
