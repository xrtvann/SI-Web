<?php

interface hitungLuas
{
    public function luas();
}

class Persegi implements hitungLuas
{
    private $sisi;

    public function __construct($sisi)
    {
        $this->sisi = $sisi;
    }

    public function getSisi()
    {
        return $this->sisi;
    }

    public function luas()
    {
        return $this->sisi * $this->sisi;
    }
}

class Segitiga implements hitungLuas
{
    private $alas;
    private $tinggi;

    public function __construct($alas, $tinggi)
    {
        $this->alas = $alas;
        $this->tinggi = $tinggi;
    }

    public function getAlas()
    {
        return $this->alas;
    }

    public function getTinggi()
    {
        return $this->tinggi;
    }

    public function luas()
    {
        return ($this->alas * $this->tinggi) / 2;
    }
}

class Lingkaran implements hitungLuas
{
    private $r;

    public function __construct($r)
    {
        $this->r = $r;
    }

    public function getJariJari()
    {
        return $this->r;
    }

    public function luas()
    {
        return pi() * $this->r * $this->r;
    }
}

$persegi = new Persegi(4);
echo "<h2>Menghitung Luas Bangun Datar</h2>";
echo "<br>";
echo "Sisi Persegi: " . $persegi->getSisi();
echo "<br>";
echo "Luas Persegi: " . $persegi->luas();
echo "<br>";
echo "<br>";
$segitiga = new Segitiga(4, 5);
echo "Alas Segitiga: " . $segitiga->getAlas();
echo "<br>";
echo "Tinggi Segitiga: " . $segitiga->getTinggi();
echo "<br>";
echo "Luas Segitiga: " . $segitiga->luas();
echo "<br>";
echo "<br>";
$lingkaran = new Lingkaran(7);
echo "Jari-Jari Lingkaran: " . $lingkaran->getJariJari();
echo "<br>";
echo "Luas Lingkaran: " . $lingkaran->luas();