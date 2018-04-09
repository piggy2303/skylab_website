#!/bin/bash

if [ $# != '1' ]
    then
    echo "ban phai nhap vao 1 tham so";
    exit;
else
    exec 60< "/etc/passwd"
    index=0
    uid_array[0]=0

    while read -u 60 s
    do
        temp=$(cut -d ':' -f3 <<<"$s")
        uid_array[$index]=$temp
        index=$[$index+1]
    done

    uid=0

    for ((u=0;u<10000;u++))
    {
        exist=0
            for ((i=0;i<$index;i++))
        {
            if [ $u -eq ${uid_array[$i]} ]; then
                exist=$[1]
                break;
            fi 
        }
        if [ $exist -eq 0 ]; then
            uid=$u
            break;
        fi
    }

    echo "The first free user ID is: $uid"

    exec 61< "/etc/group"
    groupid=0
    group_index=0
    gid_array[0]=0

    while read -u 61 s
    do
        temp=$(cut -d ':' -f3 <<<"$s")
        gid_array[$group_index]=$temp
        group_index=$[$group_index+1]
    done


    exec 61<&-


    for ((u=0;u<10000;u++))
    {
        exist=0
            for ((i=0;i<$group_index;i++))
        {
            if [ $u -eq ${gid_array[$i]} ]; then
                exist=$[1]
                break;
            fi 
        }
        if [ $exist -eq 0 ]; then
            groupid=$u
            break;
        fi
    }

    echo "The first free user gID is: $groupid"

    #tim` groupid private $groupid

    mkdir "/home/$1"
    groupadd -g $groupid $1
    useradd -d "/home/$1" -u $uid -g $groupid -p "12345678" $1
    echo "Da tao nguoi dung $1. UID: $uid. GID: $groupid. Mat khau: 12345678"
fi
