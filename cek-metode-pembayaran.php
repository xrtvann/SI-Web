<?php

$bayar = "gopay";

if ($bayar == "cash") {
    echo "Pembayaran tunai 💵";
} elseif ($bayar == "gopay") {
    echo "Pembayaran dengan GoPay 📱";
} elseif ($bayar == "ovo") {
    echo "Pembayaran dengan OVO 🟣";
} elseif ($bayar == "dana") {
    echo "Pembayaran dengan Dana 🔵";
} else {
    echo "Metode pembayaran tidak dikenal ❌";
}
