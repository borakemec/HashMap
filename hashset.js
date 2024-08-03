class HashSet {
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

    set(key) {
        const hashCode = this.hash(key);
        const bucket = this.buckets[hashCode];

        if(bucket.includes(key)) {
            return;
        }

        bucket.push(key);
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
                this.set(bucket[j]);
            }
        }
    }

    get(key) {
        const hashCode = this.hash(key);
        const bucket = this.buckets[hashCode];

        if(bucket.includes(key)) {
            return key;
        }
        return null;
    }

    has(key) {
        const hashCode = this.hash(key);
        const bucket = this.buckets[hashCode];

        return bucket.includes(key);
    }

    remove(key) {
        const hashCode = this.hash(key);
        const bucket = this.buckets[hashCode];

        if(bucket.includes(key)) {
            bucket.splice(key, 1);
            this.size--;
            return true;
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
                result.push(bucket[j]);
            }
        }
        return result;
    }

}

const test = new HashSet();
test.set('apple');
test.set('banana');
test.set('carrot');
test.set('dog');
test.set('elephant');
test.set('frog');
test.set('grape');
test.set('hat');
test.set('ice cream');
test.set('jacket');
test.set('kite');
test.set('lion');

test.set('bora');

console.log(test.buckets.length);