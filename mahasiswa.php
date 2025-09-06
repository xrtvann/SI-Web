<?php

class Mahasiswa
{
    public $nama;
    public $nim;
    public $gol;

    public function masukKelas($namaKelas)
    {
        return "Saya masuk kelas $namaKelas";
    }

    public function tugas($namaMk)
    {
        return "Saya mengerjakan tugas $namaMk";
    }
}


$Irvan = new Mahasiswa();
echo "Nama : ". $Irvan->nama = "Irvan";
echo "<br>";
echo "NIM : ". $Irvan->nim = "E41241822";
echo "<br>";
echo "Golongan : ". $Irvan->gol = "E";
echo "<br>";

echo $Irvan->masukKelas("Workshop Sistem Informasi Berbasis Web");
echo "<br>";
echo $Irvan->tugas("Pemrograman Web 2");