<?php

class Mahasiswa
{
    private $nama;
    private $nim;
    private $gol;

    function setName($nama)
    {
        $this->nama = $nama;
    }

    function getName() {
        return $this->nama;
    }

    function masukKelas($namaKelas)
    {
        return "Saya masuk kelas $namaKelas";
    }

    function tugas($namaMk)
    {
        return "Saya mengerjakan tugas $namaMk";
    }
}

