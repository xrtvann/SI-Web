<?php

class Perpustakaan
{
    public $judulBuku;
    public $jumlahBuku;

    public $peminjam;
    public $tglPinjam;
    public $tglKembali;

    public function __construct($judulBuku, $jumlahBuku, $peminjam, $tglPinjam, $tglKembali)
    {
        $this->judulBuku = $judulBuku;
        $this->jumlahBuku = $jumlahBuku;
        $this->peminjam = $peminjam;
        $this->tglPinjam = $tglPinjam;
        $this->tglKembali = $tglKembali;
    }

    public function pinjam()
    {
        return "Nama Peminjam : " . $this->peminjam . "</br>" .
            "Judul Buku    : " . $this->judulBuku . "</br>" .
            "Jumlah        : " . $this->jumlahBuku . "</br>" .
            "Tgl Pinjam    : " . $this->tglPinjam . "</br>" .
            "Tgl Kembali   : " . $this->tglKembali . "</br>";
    }

    public function kembali($jumlahKembali = null, $tglKembaliCustom = null)
    {
       
        $jumlah = $jumlahKembali ?? $this->jumlahBuku;
        $tanggalKembali = $tglKembaliCustom ?? $this->tglKembali;

        
        $tglPinjam = new DateTime($this->tglPinjam);
        $tglKembali = new DateTime($tanggalKembali);
        $selisih = $tglKembali->diff($tglPinjam)->days;

        $status = $selisih <= 5 ? "tepat waktu" : "terlambat " . $selisih . " hari";
        $denda = $selisih > 5 ? $jumlah * 2500 : 0;

        $result = "Buku $this->judulBuku telah dikembalikan oleh $this->peminjam";

    
        if ($jumlahKembali !== null && $jumlahKembali < $this->jumlahBuku) {
            $result = "Dikembalikan $jumlah dari $this->jumlahBuku buku $this->judulBuku oleh $this->peminjam";
        }

        $result .= " pada tanggal $tanggalKembali ($status)";

        if ($denda > 0) {
            $result .= " - Denda: Rp $denda";
        }

        return $result;
    }
    public function denda()
    {
        $tglKembali = new DateTime($this->tglKembali);
        $tglSekarang = new DateTime();
        $selisih = $tglSekarang->diff($tglKembali)->days;

        if ($selisih > 5) {
            $denda = $this->jumlahBuku * 2500;
            return "Denda yang harus dibayar adalah Rp $denda karena terlambat $selisih hari.";
        } else {
            return "Tidak ada denda. Buku dikembalikan tepat waktu.";
        }
    }
}


$andi = new Perpustakaan("Pemrograman Web", 3, "Andi", "04-09-2025", "08-09-2025");
echo $andi->pinjam();
echo "<br>";
echo $andi->kembali();
echo "<br>";
echo $andi->denda();
echo "<br>";
echo "<br>";
echo "<br>";
echo "<br>";

$iwan = new Perpustakaan("Basis Data", 2, "Iwan", "04-09-2025", "13-09-2025");
echo $iwan->pinjam();
echo "<br>";
echo $iwan->kembali();
echo "<br>";
echo $iwan->denda();
echo "<br>";
echo "<br>";
echo "<br>";
echo "<br>";

// Nana case - borrowed 3 books on September 4th
// Scenario: 2 books returned on Sept 8th (on time), 1 book returned on Sept 16th (late)
$nana = new Perpustakaan("Mixed Books Collection", 3, "Nana", "04-09-2025", "16-09-2025");
echo $nana->pinjam();
echo "<br>";
echo $nana->kembali(2, "08-09-2025");
echo "<br>";
echo $nana->kembali(1, "16-09-2025");
echo "<br>";
echo "<br>";
echo "<br>";
echo "<br>";