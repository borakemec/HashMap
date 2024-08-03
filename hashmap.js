class HashMap {
    constructor() {
        this.buckets = new Array(16).fill(null).map(() => []);
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
        }

        return hashCode;
    }

    set(key, value) {
        const hashCode = this.hash(key);
        const bucket = this.buckets[hashCode];

        for(let i = 0; i < bucket.length; i++) {
            if(bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this.size++;

        if(this.size / this.buckets.length > 0.75) {
            this.resize(this.buckets.length * 2);
        }

    }

    resize(newSize) {
        const oldBuckets = this.buckets;
        this.buckets = new Array(newSize).fill(null).map(() => []);
        this.size = 0;

        for(let i = 0; i < oldBuckets.length; i++) {
            const bucket = oldBuckets[i];
            for(let j = 0; j < bucket.length; j++) {
                const [key, value] = bucket[j];
                this.set(key, value);
            }
        }
    }

    get(key) {
        const hashCode = this.hash(key);
        const bucket = this.buckets[hashCode];

        for(let i = 0; i < bucket.length; i++) {
            if(bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return null;
    }

    has(key) {
        const hashCode = this.hash(key);
        const bucket = this.buckets[hashCode];

        for(let i = 0; i < bucket.length; i++) {
            if(bucket[i][0] === key) {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        const hashCode = this.hash(key);
        const bucket = this.buckets[hashCode];

        for(let i = 0; i < bucket.length; i++) {
            if(bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(16).fill(null).map(() => []);
        this.size = 0;
    }

    keys() {
        let result = [];
        for(let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];
            for(let j = 0; j < bucket.length; j++) {
                result.push(bucket[j][0]);
            }
        }
        return result;
    }

    values() {
        let result = [];
        for(let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];
            for(let j = 0; j < bucket.length; j++) {
                result.push(bucket[j][1]);
            }
        }
        return result;
    }

    entries() {
        let result = [];
        for(let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];
            for(let j = 0; j < bucket.length; j++) {
                result.push([bucket[j][0], bucket[j][1]]);
            }
        }
        return result;
    }

}

const test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

test.set('banana', 'monkey');

test.set('moon', 'silver');

console.log(test.length());