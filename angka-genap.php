<?php

$angkaAwal = 1;
$angkaAkhir = 10;

for ($i = $angkaAwal; $i <= $angkaAkhir; $i++) {
    if ($i % 2 === 0) {
        echo $i . " ";
    }
}


for ($i = 0; $i < 100; $i++) {
    if ($i == 13) {
        break;
    }
    echo $i;
    echo "<br />";
}

