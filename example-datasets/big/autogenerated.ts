// Auto-generated. Do not edit.
namespace ml {
  export namespace event {
    //% fixedInstance block="Shake Vertical"
    export const ShakeVertical = new MlEvent(2, "Shake Vertical");
    //% fixedInstance block="Still up"
    export const StillUp = new MlEvent(3, "Still up");
    //% fixedInstance block="Circle"
    export const Circle = new MlEvent(4, "Circle");
    //% fixedInstance block="Shake horizontal"
    export const ShakeHorizontal = new MlEvent(5, "Shake horizontal");
    //% fixedInstance block="Still down"
    export const StillDown = new MlEvent(6, "Still down");
    //% fixedInstance block="Throw up"
    export const ThrowUp = new MlEvent(7, "Throw up");
    //% fixedInstance block="Arm roll"
    export const ArmRoll = new MlEvent(8, "Arm roll");
    //% fixedInstance block="Free fall"
    export const FreeFall = new MlEvent(9, "Free fall");
  }

  events = [event.Unknown, event.ShakeVertical, event.StillUp, event.Circle, event.ShakeHorizontal, event.StillDown, event.ThrowUp, event.ArmRoll, event.FreeFall];

  control.onEvent(MlRunnerIds.MlRunnerInference, 1, () => {
    if (!event.Unknown.onStartHandler) {
      maybeUpdateEventStats(event.Unknown);
    }
  });

  control.onEvent(MlRunnerIds.MlRunnerInference, 2, () => {
    if (!event.ShakeVertical.onStartHandler) {
      maybeUpdateEventStats(event.ShakeVertical);
    }
  });

  control.onEvent(MlRunnerIds.MlRunnerInference, 3, () => {
    if (!event.StillUp.onStartHandler) {
      maybeUpdateEventStats(event.StillUp);
    }
  });

  control.onEvent(MlRunnerIds.MlRunnerInference, 4, () => {
    if (!event.Circle.onStartHandler) {
      maybeUpdateEventStats(event.Circle);
    }
  });

  control.onEvent(MlRunnerIds.MlRunnerInference, 5, () => {
    if (!event.ShakeHorizontal.onStartHandler) {
      maybeUpdateEventStats(event.ShakeHorizontal);
    }
  });

  control.onEvent(MlRunnerIds.MlRunnerInference, 6, () => {
    if (!event.StillDown.onStartHandler) {
      maybeUpdateEventStats(event.StillDown);
    }
  });

  control.onEvent(MlRunnerIds.MlRunnerInference, 7, () => {
    if (!event.ThrowUp.onStartHandler) {
      maybeUpdateEventStats(event.ThrowUp);
    }
  });
  
  control.onEvent(MlRunnerIds.MlRunnerInference, 8, () => {
    if (!event.ArmRoll.onStartHandler) {
      maybeUpdateEventStats(event.ArmRoll);
    }
  });

  control.onEvent(MlRunnerIds.MlRunnerInference, 9, () => {
    if (!event.FreeFall.onStartHandler) {
      maybeUpdateEventStats(event.FreeFall);
    }
  });

  getModelBlob = (): Buffer => {
    const result = hex`4C444F4D9C001900500003000000000000000008CDCC4C3F0F5368616B6520566572746963616C00CDCC4C3F095374696C6C207570000000CDCC4C3F07436972636C6500CDCC4C3F115368616B6520686F72697A6F6E74616C000000CDCC4C3F0B5374696C6C20646F776E00CDCC4C3F095468726F77207570000000CDCC4C3F0941726D20726F6C6C000000CDCC4C3F0A467265652066616C6C0000620F47304D4C344650000000C40E0000A40500000000000000000000A80000000800000001000000080000000100000000000000000000000000000000000000180000000000000008000000000000002DE9F05F0F460169091839600021796038680346B3EC1E1A07F2080292EC010A20EE010A30EE210AA2EC010A92EC010A20EE020A30EE220AA2EC010A92EC010A20EE030A30EE230AA2EC010A92EC010A20EE040A30EE240AA2EC010A92EC010A20EE050A30EE250AA2EC010A92EC010A20EE060A30EE260AA2EC010A92EC010A20EE070A30EE270AA2EC010A92EC010A20EE080A30EE280AA2EC010A92EC010A20EE090A30EE290AA2EC010A92EC010A20EE0A0A30EE2A0AA2EC010A92EC010A20EE0B0A30EE2B0AA2EC010A92EC010A20EE0C0A30EE2C0AA2EC010A92EC010A20EE0D0A30EE2D0AA2EC010A92EC010A20EE0E0A30EE2E0AA2EC010A92EC010A20EE0F0A30EE2F0AA2EC010A02F22402B3EC121A07F2440292EC010A20EE010A30EE210AA2EC010A92EC010A20EE020A30EE220AA2EC010A92EC010A20EE030A30EE230AA2EC010A92EC010A20EE040A30EE240AA2EC010A92EC010A20EE050A30EE250AA2EC010A92EC010A20EE060A30EE260AA2EC010A92EC010A20EE070A30EE270AA2EC010A92EC010A20EE080A30EE280AA2EC010A92EC010A20EE090A30EE290AA2EC010A02F23C02386800F2C00307F268021024B3EC010A07F20801F1EC0E0AF3EC0E7A60EEA70A21EE081A30EE200A61EEA81A30EE010A22EE092A30EE210A62EEA92A30EE020A23EE0A3A30EE220A63EEAA3A30EE030A24EE0B4A30EE230A64EEAB4A30EE040A25EE0C5A30EE240A65EEAC5A30EE050A26EE0D6A30EE250A66EEAD6A30EE060A27EE0E7A30EE260A30EE070AF1EC0A0AF3EC0A7A60EEA70A21EE081A30EE200A61EEA81A30EE010A22EE092A30EE210A62EEA92A30EE020A23EE0A3A30EE220A63EEAA3A30EE030A24EE0B4A30EE230A64EEAB4A30EE040A25EE0C5A30EE240A30EE050AA2EC010A013C8FD107F2680210680028B8BF40F2000001C210680028B8BF40F2000001C210680028B8BF40F2000001C210680028B8BF40F2000001C210680028B8BF40F2000001C210680028B8BF40F2000001C210680028B8BF40F2000001C210680028B8BF40F2000001C210680028B8BF40F2000001C210680028B8BF40F2000001C210680028B8BF40F2000001C210680028B8BF40F2000001C210680028B8BF40F2000001C210680028B8BF40F2000001C210680028B8BF40F2000001C210680028B8BF40F2000001C2386800F2007307F208020824B3EC010A07F26801F1EC0E0AF3EC0E7A60EEA70A21EE081A30EE200A61EEA81A30EE010A22EE092A30EE210A62EEA92A30EE020A23EE0A3A30EE220A63EEAA3A30EE030A24EE0B4A30EE230A64EEAB4A30EE040A25EE0C5A30EE240A65EEAC5A30EE050A26EE0D6A30EE250A66EEAD6A30EE060A27EE0E7A30EE260A30EE070AF1EC020AF3EC027A60EEA70A21EE081A30EE200A30EE010AA2EC010A013CAFD107F208021046082100F002F8BDE8F09F012938B5D0ED002A29D9031D00EB8102F3EC017AF4EE627AF1EE10FAC8BFF0EE672A9A42F4D1002402EE104A054695ED000A30EE620A00F015F80134A14232EE002AA5EC010AF2D8002390ED007AC7EE027A01339942E0EC017AF6D838BD0029E1D138BDDFED297AB4EEE70AF1EE10FA48D4DFED277AB4EEE70AF1EE10FA3ADCDFED247ADFED244A9FED243ADFED243A9FED245A9FED244ADFED245A9FED246ADFED246A60EE277AB7EE007A77EEA47A77EEE47AA7EE830AFDEEE74AA7EEA30AF0EE457AE4EE007A14EE903AE7EE805AA5EE806AE6EE006AF0EE667AF0EE476AE7EE806AA6EE807A17EE102A02EBC35300EE103A7047DFED107AB7EE007A87EE270A70479FED0C0A704700000000AAC20000AE423BAAB83F0000404B007231BF8EBEBFB56E2F093C00A0B43AADAD2A3D28AA2A3EFBFFFF3E00000000134DE33F1F1001C070D91440C28E3CBFF554BB3FBE15E0BE51A36140589E023DD6EB484028824ABDFF3515406FF7833F39ED16403273043FD1A20340EB88BC3F97530B40BBEE1440510E8340383DD7BF1F698240C61BA3BF537D1F40E16C2CBECA37803F6A321DC0E045093FBFE0D5BF351CBC3FDB8C6BC098BB3C3D914F0BC0D1086B3DBB0406C0005D853D2A86A9C072738C41241CBFBFC78A764104F569BF9BB7064225DFABBF30C907402510A7BF4B75CB3F1B35B4BE8955674026F16CC0C3E272BF8AE6053F5D9885BDCCA5C83D93780F3E90F01C3FF5B1113D328B4C3F3945A33E27CDAFBFE1DC8EBF3D4B2ABE0B014B3FB20D6CBE66BC633C92BAE4BEFBF480BF920D27BF9E82433F98B3AF3E0AF92A3FE453C43F258845BFCF60CCBEE835923FD25750BFC27163BF0C479A3E118D063F1916CDBF3DF7D5BEE5E5D83D69AE82BE9846BBBE0A61963E2D010A3F666C24BE76541DBE72F75DBF687EED3EECD4CEBE253413BE95213CBE081D893E5C382DBFA2BA69BDB347823EEAD1D03D5AC87CBCDD563C3F106F39BF086F37BFF45B00BF7F8C7DBF488F37BF8E8853BFE10D57BFAB0C743FE781C8BFABD01E3EF3A99CBEEB21A73F36DA26BFDFFFF13DB48A973EA2C30FBF983E0DBEE8C9A83FCB1FE7BD7C10D4BDCAE39DBE3DAF9EBF2CC902BE8567673FFBFEBFBE82B53DBFF1BC8C3EE88D8EBFD578DE3D8151193D62E684BD1D8C363F45A8933FD483C8BE817E103F23A6B9BEFF54BABBA1E801BFA6C464BFBC5BC9BE86CDC7BEBF424FBE97151C3F823D993E2221683FC38B94BEB8F466BFBAB584BC0BB880BC909AE13CFA7364BF77F4D3BD15F9963E45D113BF1402A6BF94D4943E2DF5F2BE6CB5D23E9AB3293F6038C63E5E01E5BE6048393EBE9564BFB1DBD73FE478E53ECBF416BF3618F33E66C8BABE5DD014BF05CC4DBF0C3FF8BE1EAA243EE84A8C3DA432BEBEED08ACBE31599FBF4E4D163D24EF84BE4B04A43F93307ABFFBC307BEEE02E53FB5D36A3F6E3B88BE8082B23F702216BD9B124C3ED2AD99BF92DE0BBFFEB2103F71FFDDBE4E1620BED6DD57BF1E8C123F7D4659BE93F1793EFB0D1EBE22E50DBFC3401EBF08DAF33DCFC6BFBF3F4CE23F7BFE363F22D4863F7377253E24D5123FE2100F3F98B73EBFC1F6CEBF2EEC903D069C68BEDAEAFF3E48041ABFD2BDB4BF2101033E8025F0BF5C8894BFCA3C85BF5B903FBF5A4EF73E69C2103FF813493FACFE28BFDCD51ABE380FA73C468C46BFA7C0F0BE0431AABFC820AE3E920B67BFF6A462BE7C8675BE6347F83E43C183BFE083823C5E32E4BEB5404B3F70BA58BE49F5C8BD39F6ED3DEBAEB13D54BB30BC1B07703F10704DBE5C128D3E76AE043EC0DD803E1012433EDF8EB93D315503BE90608EBFC9E03D3E1C4A6CBFE02991BE5D2BF03ECB64D83E33C78BBF20B2253FF3D043BE4E3A8EBFAAEE5FBE5B4936BF966560BE427FC3BF859E21BF0532CFBF237E6A3FCB45433F6B1A69BE2AC24BBE9956DDBD46596BBFD1EA053F338A36BECD33353E98688CBF15340F3E058088BF6D75E43EE6D5453DDD05B03E6034073DA35F573FDAB7E43E61858BBFD52919BEE60F7C3D00C8CD3E8837223EDB3A413FF098573F996A873EF6B6363E97BE234088E4C33E22FE213FC4D0A03FD17A7DBEF17037BE107FD13E30F641BF5021843F8B93D5BF4A2C54BF775F033FD30EA9BF8C5954BFF5E46EBE610421BB5CBE773F1162ED3F5B3B48BFB9A7A0BF23294D3F74DB883E7C1F82BE2518853F72C567BEFE4DB73E71A7EC3E0A01BFBD50CA29BE7F79233F345A26BFFAFFFB3DA3EB86BF51E4CD3E921092BE1A3C08BF6F179CBE5534A3BF9693C4BDAA3AE93F2B20D33F534654BE577895BDBE6D36BFF8132EBF9E0DAFBFBF1E0DBF88E61CC03007533F1F9A14BE0AB8ADBF458A333F2D2405BF5750ED3F0DCB843E68585CBEB66B45BFA85129BFA7E0E4BEB5CADE3FF9EE0CBFF1A0CBBEB0B2703D69A6E4BE79657E3FAD6D60BFC8C0413E0C9177BF9E91A53F86A165BF9794CEBE8EE0D73E4074F53E0C23A0BD7BD3FE3E4F7C1A3F2AD2CC3F82BE023FDCFB80BF952A04BE2F7E993CAE31353E3CC92FBF02B85D3F0DF562BF21AC8EBD1FFDB43F54DD9B3E75412A3F7AE1C23FE10A2CBFF58DB43EFC3B473EC5B0A23E3F9190BDCAE3BD3E389F553E72910A3F5A9E373FF5C08BBE3ADDB5BECDEB8BBE8A79953D6499E8BEB4452E3FFD6753BE7553413ED53D4CBFFB9BE03E1CACDABE1702BDBEA4FE9C3D5D45AF3D067A27BE0BB6AF3FBEE7443E7FD0613F72213C3FB09085BEC2DE99BF8C20F1BE72155E3F018DFF3FAEA00E3F6FA017BE779F58BEEC673CBE47082A3EC5DF47BF3067DE3EA6020ABF903325BE1F8F0FBFAD92923FBAA6803E40D3C3BF5A32F33E4F6A8B3ED0A23FBF4501B83D3E4FD63E1CD20D3E097EDB3D7F6B9ABE5825A3BFFE85593EC8C2393FCCAA183F2371463E21330BBF98D9AC3FF52C673F0092003EAF24D1BFBF7199BE69800CBF22AB903EE7D2853FE139953FEE40CBBE31842FBF8EB160BF8DEB023F362B55BF290484BE9953933E009E7D3D2EBCAA3F5082BC3EE9FD23BE619EDEBDB2FAB53EA76503BF93CB6DBF75937CBF3B918F3E48CD20BB72A1703F4CC2723FB237853E3A393ABFF71E90BF868DBDBEC0C8BF3F73BF9F3EF30A24BFCE08B13F0EC4373E0EFB65BECF5408BF0A44563F3003D93EE4E978BF69C38DBEA18101BE5C8D77BBCA39B13F6C63F6BD23DD71BF6A6F0ABF6BD9B03EA0A68B3E78F2C6BF89E5F8BE5D5E77BF4A6711BFEC03313F3F02E83F337150BF4AA473BEE7557DBF8549663F6F8916BF9FEE1B3EC90416BEA3932CBEC46D05BF8790E83D3367CC3E2B67004043E695BE8C0BF43FA68F04BF97F6873EED1EDB3FBFE34BBF959838BF5D38333F68A221BFD88D0040926C30BF74BBF83F835D46BFCB7ADEBE708CBFBE1B7B92BFA58C76BFBECFF23E3A996EBE51F78DBF03C30A3E9502FEBEB32E8E3E7230AF3F5D3B083E8ED6ADBE94C4563EE363B2BF8A6817BF4F74F63F7122203F8D203C3ED6FC1ABF3CD58EBE8E969CBF78F16F3E7606723FA0AB29BEC53A47BF5736BC3F671BA23D940B603F0C647C3F7FAF80BD80C1173E5B17A5BD0D5CE23E685F703FB78D3BBFEDADA4BEACB6393F91AD66BF8B5BDDBE85560140CBF37B3F84FC8FBF2EC31EBF64613EBE2B6B0A3ED9D48DBE41E763BE219A833E981FC13E9CE1983FA15625BCE295B1BFECD603BE1B45DCBE83BFE33FB8FD17BF43AB8EBEF070E9BEAC09073A000000000000000000000000`;
    return result;
  };
}


// Auto-generated. Do not edit. Really.
