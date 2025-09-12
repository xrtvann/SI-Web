<?php

require_once 'mobil/MobilLengkap.php';
require_once 'mobil/MobilBMW.php';
require_once 'mobil/MobilBMWBeraksi.php';
require_once 'itemProduct/ItemProduct.php';
require_once 'itemProduct/Baju.php';
require_once 'itemProduct/Celana.php';
require_once 'itemProduct/Topi.php';

echo "<h1>Tugas 1</h1>";
$mobilBMW = new mobilBMW();
echo $mobilBMW->nontonTV();
echo "<br>";
echo "<br>";

$beraksi = new MobilBMWBeraksi();
echo $beraksi->nontonTV();
echo "<br>";
echo $beraksi->hidupkanMobil();
echo "<br>";
echo $beraksi->matikanMobil();
echo "<br>";
echo $beraksi->ubahGigi();

echo "<h1>Tugas 2</h1>";
$topi = new Topi();
$celana = new Celana();
$baju = new Baju();


echo "Nama : " . $topi->nama() . "<br>";
echo "Model : ". $topi->getModel() . "<br>";
echo "Warna : " . $topi->warna() . "<br>";
echo "Ukuran : " . $topi->ukuran() . "<br>";

echo "<br>";
echo "Nama : " . $celana->nama() . "<br>";
echo "Tipe : ". $celana->getTipe() . "<br>";
echo "Model : ". $celana->getModel() . "<br>";
echo "Warna : " . $celana->warna() . "<br>";
echo "Ukuran : " . $celana->ukuran() . "<br>";

echo "<br>";
echo "Nama : " . $baju->nama() . "<br>";
echo "Tipe : ". $baju->getTipe() . "<br>";
echo "Warna : " . $baju->warna() . "<br>";
echo "Ukuran : " . $baju->ukuran() . "<br>";
