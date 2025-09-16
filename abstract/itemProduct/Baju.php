<?php
class Baju extends ItemProduct {
    private $tipe = "Baju";
    public function ukuran() {
        return "L";
    }
    public function warna() {
        return "Merah";
    }
    public function nama() {
        return "Kaos Stripe X";
    }
    public function getTipe() {
        return $this->tipe;
    }
}