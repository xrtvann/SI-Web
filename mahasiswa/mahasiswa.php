<?php

class Mahasiswa
{
    private $nama;
    private $nim;
    private $gol;

    public function setName($nama)
    {
        $this->nama = $nama;
    }

    public function getName() {
        return $this->nama;
    }

    public function masukKelas($namaKelas)
    {
        return "Saya masuk kelas $namaKelas";
    }

    public function tugas($namaMk)
    {
        return "Saya mengerjakan tugas $namaMk";
    }
}

class mahasiswaTI extends Mahasiswa
{
    public function praktikum($namaPraktikum)
    {
        return "Saya mengerjakan praktikum $namaPraktikum";
    }
}  

$irvan = new mahasiswaTI();
$irvan->setName("Irvan");
echo "Nama :". $irvan->getName();
echo "<br>";
echo $irvan->masukKelas("Pemrograman Web 2");
echo "<br>";
echo $irvan->tugas("Pemrograman Web 2");
echo "<br>";
echo $irvan->praktikum("Pemrograman Web 2");
