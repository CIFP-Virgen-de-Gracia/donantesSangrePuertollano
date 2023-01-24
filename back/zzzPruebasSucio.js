array = {n1: 1, n2: 2, n3: 3};

for (const key in array) {
    if (Object.hasOwnProperty.call(array, key)) {
        const n = array[key];
        
        console.log(n);
    }
}