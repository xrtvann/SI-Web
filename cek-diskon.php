<?php
$total = 55000;

if ($total >= 100000) {
    echo "Diskon 20%! 🎉";
} elseif ($total >= 50000) {
    echo "Diskon 10%! 🎊";
} else {
    echo "Belum dapat diskon 😅";
}
