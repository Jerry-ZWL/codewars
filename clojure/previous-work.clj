#_(defn factorial [n]
    (reduce
     (fn [a b] (* (bigint a) (bigint b)))
     1
     (rest (range (+ n 1))) ))

#_(defn zeros [n]
    (loop [i 0
           fac  (factorial n)]
      (if-not (= 0 (mod fac 10))
        i
                                        ;else
        (recur (inc i)
               (/ fac 10)))))


(defn factorial [n]
  (reduce *' (range 1 (inc n))))


(defn zeros [n]
  (let [result (str (factorial n))
        replaced (.trim (.replaceAll result "0" " "))
        result-length (count result)
        replaced-length (count replaced)]
    (- result-length replaced-length)))


(defn sum-n-length [arr l]
  (let [arr (vec arr)
        sub-array (subvec arr 0 l)]
    (reduce + sub-array)))

(defn sum-n-length-vec [arr l]
  (let [arr (reverse arr)]
    ()))

(defn find-even-index [arr]
  (let [reverse-arr (reverse arr)
        target (int (Math/ceil (/ (count arr) 2)))
        even-arr (even? (count arr))
        mid (if even-arr target (dec target))]
    (loop [i mid
           sum (sum-n-length arr i)
           sum-rev (sum-n-length reverse-arr i)]
      (if (< i 1)
        -1
        (if (= sum sum-rev)
          (if even-arr (dec i) i)
          (recur (dec i)
                 (sum-n-length arr (dec i))
                 (sum-n-length reverse-arr (dec i))))))))


(defn get-middle [s]
  (let [length (count s)
        mid (/ length 2)
        mid-floor (Math/floor mid)]
    (cond
      (= 1 length)(str s)
      (odd? length) (str (.charAt s mid-floor))
      (even? length) (str (.charAt s (- mid 1))(.charAt s mid)))))




(defn multiplier-coll [n]
  (let [coll3 (range 3 n 3)
        coll5 (range 5 n 5)]
    (concat coll3 coll5)))


(defn solution [number]
  (let [coll (multiplier-coll number)]
    (reduce +' coll)))

(defn n! [n]
  (reduce *' (range 1 (inc n))))

(defn power [z]
  ())


(defn printer-error [s]
  (let [denominator (count s)
        m (int \m)]
    (loop [err 0
           chars (vec s)]
      (if-not (empty? chars)
        (recur (if (> (int (first chars)) m)
                 (inc err)
                 err)
               (rest chars))
        (str err \/ denominator)))))

(defn printer-error [s]
  (str (count (re-seq #"[n-z]" s)) "/" (count s))
  )

;it ends here for all the problems I have done. they are all below level 4.
