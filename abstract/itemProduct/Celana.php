<?php
class Celana extends ItemProduct {
    private $tipe = "Celana";
    private $model = "Skinny";
    public function ukuran() {
        return "M";
    }
    public function warna() {
        return "Hitam";
    }
    public function nama() {
        return "Long Stripe Pants";
    }
    public function getTipe() {
        return $this->tipe;
    }
    public function getModel() {
        return $this->model;
    }
}