var arr = [12, 4, 2, 56, 3, 1];

//冒泡排序
function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - i; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

//冒泡排序改进，使用pos记录下标
//设置一标志性变量pos,用于记录每趟排序中最后一次进行交换的位置。
// 由于pos位置之后的记录均已交换到位,故在进行下一趟排序时只要扫描到pos位置即可。
function bubbleSort2(arr) {
    var len = arr.length,
        i = len - 1;
    while(i>0) {
        var pos = 0;
        for (var j = 0; j < i; j++) {
            if(arr[j] > arr[j+1]){
                pos = j;
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
        i = pos;
    }
}

//冒泡改进
//每趟排序中进行正向和反向两遍冒泡的方法一次可以得到两个最终值(最大者和最小者) , 从而使排序趟数几乎减少了一半
//    function bubbleSort3(arr) {
//        var low = 0,
//            high = arr.length - 1,
//            temp = arr[low]
//            ,j;
//        while(low < high){
//            for(j = low; j < high; j++){
//                if(arr[j] > arr[j+1]){
//                    temp = arr[j+1];
//                    arr[j+1] = arr[j];
//                    arr[j] = temp;
//                }
//            }
//            --high;
//            for(j = high; j > low; j --){
//                if(arr[j] > arr[j-1]){
//                    temp = arr[j];
//                    arr[j] = arr[j-1];
//                    arr[j-1] = temp;
//                }
//            }
//            ++low;
//        }
//    }

//选择排序
function selectSort(arr) {
    var len = arr.length;
    for(var i = 0; i < len; i++){
        var min = i;
        for(var j = i + 1; j < len; j++){
            if(arr[j] < arr[min]){
                min = j;
            }
        }
        if(min != i){
            var temp = arr[min];
            arr[min] = arr[i];
            arr[i] = temp;
        }
    }
}

//插入排序
//工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
function insertSort(arr) {
    var len = arr.length;
    for(var i = 0; i < len - 1; i++){
        var insert = arr[i+1],
            index = i+1;
        for(var j = i; j >= 0 ; j--){
            if(insert < arr[j]){
                arr[j+1] = arr[j]
                index = j;
            }
        }
        arr[index] = insert;
    }

}

//希尔排序
function shellSort(arr) {
    var len = arr.length;
    var gap = Math.round(len/2);
    while (gap > 0){
        for(var i = gap; i < len ; i++){
            var insert = arr[i];
            var index = i;
            for(var j = i; j >= 0; j -= gap){
                if(insert < arr[j]){
                    arr[j+gap] = arr[j];
                    index = j;
                }
            }
            arr[index] = insert;
        }
        gap = Math.round(gap/2 - 0.1);
    }
}

//快速排序
//快速排序的基本思想：通过一趟排序将待排记录分隔成独立的两部分
// 其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。
function quickSort(arr) {
    var len = arr.length;
    if(len <= 1){
        return arr;
    }else{
        var smaller = [];
        var bigger = [];
        var base = [arr[0]];
        for(var i = 1; i < len; i++){
            if(arr[i] <= base[0]){
                smaller.push(arr[i]);
            }else{
                bigger.push(arr[i]);
            }
        }
        return quickSort(smaller).concat(base.concat(quickSort(bigger)));
    }
}


//归并算法
//归并排序是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。归并排序是一种稳定的排序方法。
// 将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为2-路归并
function MergeSort(array) {
    var length = array.length;
    if (length <= 1) {
        return array;
    } else {
        var num = Math.ceil(length/2);
        var left = MergeSort(array.slice(0, num));
        var right = MergeSort(array.slice(num, length));
        return merge(left, right);
    }
}
function merge(left, right) {
    var a = new Array();
    while (left.length > 0 && right.length > 0) {
        if (left[0] <= right[0]) {
            var temp = left.shift();
            a.push(temp);
        } else {
            var temp = right.shift();
            a.push(temp);
        }
    }
    if (left.length > 0) {
        a = a.concat(left);
    }
    if (right.length > 0) {
        a = a.concat(right);
    }
    console.log(a);
    console.log("-----------------------------");
    return a;
}