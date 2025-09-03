<?php

$metrixA = array(
    array(1, 1, 1),
    array(2, 2, 2),
    array(3, 3, 3)
);

$metrixB = array(
    array(3, 3, 3),
    array(2, 2, 2),
    array(1, 1, 1)
);

for ($i = 0; $i < 3; $i++) {
    for ($j = 0; $j < 3; $j++) {
        $result[$i][$j] = $metrixA[$i][$j] + $metrixB[$i][$j];
        echo $result[$i][$j]. " ";
    }
    echo "<br />";
}