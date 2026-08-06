# ເມື່ອ ML ເລີ່ມຕົ້ນ

ເລີ່ມຕົ້ນ  [event handler](/reference/event-handler) (ສ່ວນໜຶ່ງຂອງໂປຣແກຣມທີ່ຈະເຮັດວຽກເມື່ອມີສິ່ງໃດໜຶ່ງເກີດຂຶ້ນ). ຕົວຈັດການນີ້ຈະເຮັດວຽກເມື່ອການກະທຳທີ່ຖືກຄາດຄະເນຂອງໂມເດວ ML ປ່ຽນໄປເປັນການກະທຳທີ່ທ່ານເລືອກ.

```sig
ml.onStart(ml.event.Unknown, function () {
})
```

ໂມເດວ ML ຈະອັບເດດການກະທຳທີ່ຖືກຄາດຄະເນຫຼາຍຄັ້ງຕໍ່ວິນາທີ ແຕ່ຕົວຈັດການເຫດການນີ້ຈະເຮັດວຽກກໍ່ຕໍ່ເມື່ອການກະທຳທີ່ຖືກຄາດຄະເນປ່ຽນແປງເທົ່ານັ້ນ.

## ພາລາມິເຕີ

- **ເຫດການ** ໜຶ່ງໃນການກະທຳທີ່ໂມເດວການຮຽນຮູ້ຂອງເຄື່ອງຈັກທີ່ຖືກຝຶກມາ. ຄ່າພິເສດ `ບໍ່ຮູ້ຈັກ` ແທນກໍລະນີທີ່ບໍ່ມີການກະທຳໃດມີຄ່າຄວາມແນ່ນອນສູງກວ່າຈຸດການຮັບຮູ້.

## ຕົວຢ່າງ

ຕົວຢ່າງນີ້ຈະເປີດເພງທຳນອງດົນຕີຢູ່ເບື້ອງຫຼັງ ເມື່ອການກະທຳ 'ການຕົບມື' ມີຄ່າຄວາມແນ່ນອນສູງກວ່າຈຸດການຮັບຮູ້.

```blocks
ml.onStart(ml.event.Clapping, function () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.13
```
