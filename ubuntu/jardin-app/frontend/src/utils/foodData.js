// Base de données des légumes avec leurs variétés et photos
const legumesData = [
  {
    id: 'tomate',
    nom: 'Tomate',
    varietes: [
      { id: 'coeur-de-boeuf', nom: 'Cœur de Bœuf', photo: 'https://www.fermedesaintemarthe.com/cdn/shop/files/1227A_d980eb7e-3610-42f8-a05e-253bfa490303.jpg?v=1738332591&width=823' },
      { id: 'marmande', nom: 'Marmande', photo: 'https://images.unsplash.com/photo-1524593166156-312f362cada0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'roma', nom: 'Roma', photo: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'cerise', nom: 'Cerise', photo: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'green-zebra', nom: 'Green Zebra', photo: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'noire-de-crimee', nom: 'Noire de Crimée', photo: 'https://images.unsplash.com/photo-1591168713796-d3551fc0a732?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'ananas', nom: 'Ananas', photo: 'https://images.unsplash.com/photo-1589621316382-008455b857cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'saint-pierre', nom: 'Saint Pierre', photo: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'andine-cornue', nom: 'Andine Cornue', photo: 'https://images.unsplash.com/photo-1524593166156-312f362cada0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'rose-de-berne', nom: 'Rose de Berne', photo: 'https://images.unsplash.com/photo-1591168713796-d3551fc0a732?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'brandywine', nom: 'Brandywine', photo: 'https://images.unsplash.com/photo-1589621316382-008455b857cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'black-cherry', nom: 'Black Cherry', photo: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'yellow-pearshaped', nom: 'Yellow Pearshaped', photo: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'tigerella', nom: 'Tigerella', photo: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'beaute-blanche', nom: 'Beauté Blanche', photo: 'https://images.unsplash.com/photo-1589621316382-008455b857cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ]
  },
  {
    id: 'carotte',
    nom: 'Carotte',
    varietes: [
      { id: 'nantaise', nom: 'Nantaise', photo: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'touchon', nom: 'Touchon', photo: 'https://images.unsplash.com/photo-1582515073490-39981397c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'de-colmar', nom: 'De Colmar', photo: 'https://images.unsplash.com/photo-1590868309235-ea34f5a3c3c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'jaune-du-doubs', nom: 'Jaune du Doubs', photo: 'https://images.unsplash.com/photo-1576181256399-834e3b3a49bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'purple-haze', nom: 'Purple Haze', photo: 'https://images.unsplash.com/photo-1633380110125-f6e685676160?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'chantenay', nom: 'Chantenay', photo: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'blanche-de-kuttingen', nom: 'Blanche de Kuttingen', photo: 'https://images.unsplash.com/photo-1576181256399-834e3b3a49bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'rouge-sang', nom: 'Rouge Sang', photo: 'https://images.unsplash.com/photo-1633380110125-f6e685676160?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'oxheart', nom: 'Oxheart', photo: 'https://images.unsplash.com/photo-1582515073490-39981397c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'danvers', nom: 'Danvers', photo: 'https://images.unsplash.com/photo-1590868309235-ea34f5a3c3c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ]
  },
  {
    id: 'courgette',
    nom: 'Courgette',
    varietes: [
      { id: 'verte-des-maraichers', nom: 'Verte des Maraîchers', photo: 'https://images.unsplash.com/photo-1596181525841-8e8633a8a799?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'ronde-de-nice', nom: 'Ronde de Nice', photo: 'https://images.unsplash.com/photo-1596181525841-8e8633a8a799?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'jaune', nom: 'Jaune', photo: 'https://images.unsplash.com/photo-1596181525841-8e8633a8a799?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'blanche', nom: 'Blanche', photo: 'https://images.unsplash.com/photo-1596181525841-8e8633a8a799?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'black-beauty', nom: 'Black Beauty', photo: 'https://images.unsplash.com/photo-1596181525841-8e8633a8a799?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'cocozelle', nom: 'Cocozelle', photo: 'https://images.unsplash.com/photo-1596181525841-8e8633a8a799?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'grisette-de-provence', nom: 'Grisette de Provence', photo: 'https://images.unsplash.com/photo-1596181525841-8e8633a8a799?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'patisson', nom: 'Pâtisson', photo: 'https://images.unsplash.com/photo-1596181525841-8e8633a8a799?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ]
  },
  {
    id: 'haricot',
    nom: 'Haricot',
    varietes: [
      { id: 'nain-contender', nom: 'Nain Contender', photo: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'mangetout', nom: 'Mangetout', photo: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'a-rame', nom: 'À Rame', photo: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'coco-blanc', nom: 'Coco Blanc', photo: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'flageolet', nom: 'Flageolet', photo: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'lingot', nom: 'Lingot', photo: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'soissons', nom: 'Soissons', photo: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'borlotto', nom: 'Borlotto', photo: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'purple-teepee', nom: 'Purple Teepee', photo: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'beurre-de-rocquencourt', nom: 'Beurre de Rocquencourt', photo: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ]
  },
  {
    id: 'laitue',
    nom: 'Laitue',
    varietes: [
      { id: 'batavia', nom: 'Batavia', photo: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'feuille-de-chene', nom: 'Feuille de Chêne', photo: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'romaine', nom: 'Romaine', photo: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'iceberg', nom: 'Iceberg', photo: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'lollo-rossa', nom: 'Lollo Rossa', photo: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'lollo-bionda', nom: 'Lollo Bionda', photo: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'merveille-des-quatre-saisons', nom: 'Merveille des Quatre Saisons', photo: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'rouge-grenobloise', nom: 'Rouge Grenobloise', photo: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'sucrine', nom: 'Sucrine', photo: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ]
  },
  {
    id: 'poivron',
    nom: 'Poivron',
    varietes: [
      { id: 'california-wonder', nom: 'California Wonder', photo: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'corne-de-taureau', nom: 'Corne de Taureau', photo: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'chocolat', nom: 'Chocolat', photo: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'jaune-d-or', nom: 'Jaune d\'Or', photo: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'yolo-wonder', nom: 'Yolo Wonder', photo: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'marconi-rouge', nom: 'Marconi Rouge', photo: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'doux-d-espagne', nom: 'Doux d\'Espagne', photo: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'orange-sun', nom: 'Orange Sun', photo: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'petit-marseillais', nom: 'Petit Marseillais', photo: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ]
  },
  {
    id: 'aubergine',
    nom: 'Aubergine',
    varietes: [
      { id: 'de-barbentane', nom: 'De Barbentane', photo: 'https://images.unsplash.com/photo-1613881553903-e81979427e7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'black-beauty', nom: 'Black Beauty', photo: 'https://images.unsplash.com/photo-1613881553903-e81979427e7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'blanche', nom: 'Blanche', photo: 'https://images.unsplash.com/photo-1613881553903-e81979427e7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'violette-de-florence', nom: 'Violette de Florence', photo: 'https://images.unsplash.com/photo-1613881553903-e81979427e7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'longue-violette', nom: 'Longue Violette', photo: 'https://images.unsplash.com/photo-1613881553903-e81979427e7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'rosa-bianca', nom: 'Rosa Bianca', photo: 'https://images.unsplash.com/photo-1613881553903-e81979427e7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'little-finger', nom: 'Little Finger', photo: 'https://images.unsplash.com/photo-1613881553903-e81979427e7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'rotonda-bianca', nom: 'Rotonda Bianca', photo: 'https://images.unsplash.com/photo-1613881553903-e81979427e7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ]
  },
  {
    id: 'radis',
    nom: 'Radis',
    varietes: [
      { id: 'flamboyant', nom: 'Flamboyant', photo: 'https://images.unsplash.com/photo-1626920369764-17284f2ce9c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'de-18-jours', nom: 'De 18 Jours', photo: 'https://images.unsplash.com/photo-1626920369764-17284f2ce9c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'noir-long', nom: 'Noir Long', photo: 'https://images.unsplash.com/photo-1626920369764-17284f2ce9c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'daikon', nom: 'Daikon', photo: 'https://images.unsplash.com/photo-1626920369764-17284f2ce9c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'cherry-belle', nom: 'Cherry Belle', photo: 'https://images.unsplash.com/photo-1626920369764-17284f2ce9c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'french-breakfast', nom: 'French Breakfast', photo: 'https://images.unsplash.com/photo-1626920369764-17284f2ce9c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'rond-ecarlate', nom: 'Rond Écarlate', photo: 'https://images.unsplash.com/photo-1626920369764-17284f2ce9c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'glaçon', nom: 'Glaçon', photo: 'https://images.unsplash.com/photo-1626920369764-17284f2ce9c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'rose-de-chine', nom: 'Rose de Chine', photo: 'https://images.unsplash.com/photo-1626920369764-17284f2ce9c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ]
  },
  {
    id: 'potiron',
    nom: 'Potiron',
    varietes: [
      { id: 'rouge-vif-d-etampes', nom: 'Rouge Vif d\'Étampes', photo: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'musquee-de-provence', nom: 'Musquée de Provence', photo: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'butternut', nom: 'Butternut', photo: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'potimarron', nom: 'Potimarron', photo: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'jack-o-lantern', nom: 'Jack O\'Lantern', photo: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'blue-hubbard', nom: 'Blue Hubbard', photo: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'spaghetti', nom: 'Spaghetti', photo: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'delicata', nom: 'Delicata', photo: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'sweet-dumpling', nom: 'Sweet Dumpling', photo: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ]
  },
  {
    id: 'oignon',
    nom: 'Oignon',
    varietes: [
      { id: 'jaune-paille', nom: 'Jaune Paille', photo: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'rouge-de-brunswick', nom: 'Rouge de Brunswick', photo: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'blanc-de-paris', nom: 'Blanc de Paris', photo: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'de-stuttgart', nom: 'De Stuttgart', photo: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'rouge-de-florence', nom: 'Rouge de Florence', photo: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'de-barletta', nom: 'De Barletta', photo: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'de-rebouillon', nom: 'De Rebouillon', photo: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'rosé-de-roscoff', nom: 'Rosé de Roscoff', photo: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ]
  },
  {
    id: 'ail',
    nom: 'Ail',
    varietes: [
      { id: 'blanc', nom: 'Blanc', photo: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'violet', nom: 'Violet', photo: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'rose', nom: 'Rose', photo: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'messidrome', nom: 'Messidrome', photo: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'thermidrome', nom: 'Thermidrome', photo: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'printanor', nom: 'Printanor', photo: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'germidour', nom: 'Germidour', photo: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ]
  },
  {
    id: 'betterave',
    nom: 'Betterave',
    varietes: [
      { id: 'detroit', nom: 'Detroit', photo: 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'chioggia', nom: 'Chioggia', photo: 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'crapaudine', nom: 'Crapaudine', photo: 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'blanche', nom: 'Blanche', photo: 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'noire-plate-d-egypte', nom: 'Noire Plate d\'Égypte', photo: 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'cylindra', nom: 'Cylindra', photo: 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'forono', nom: 'Forono', photo: 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'golden', nom: 'Golden', photo: 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ]
  },
  {
    id: 'chou',
    nom: 'Chou',
    varietes: [
      { id: 'cabus', nom: 'Cabus', photo: 'https://images.unsplash.com/photo-1551889779-b0cd42b1e81a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'de-bruxelles', nom: 'De Bruxelles', photo: 'https://images.unsplash.com/photo-1551889779-b0cd42b1e81a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'kale', nom: 'Kale', photo: 'https://images.unsplash.com/photo-1551889779-b0cd42b1e81a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'romanesco', nom: 'Romanesco', photo: 'https://images.unsplash.com/photo-1551889779-b0cd42b1e81a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'rouge', nom: 'Rouge', photo: 'https://images.unsplash.com/photo-1551889779-b0cd42b1e81a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'milan', nom: 'Milan', photo: 'https://images.unsplash.com/photo-1551889779-b0cd42b1e81a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'brocoli', nom: 'Brocoli', photo: 'https://images.unsplash.com/photo-1551889779-b0cd42b1e81a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'chou-fleur', nom: 'Chou-fleur', photo: 'https://images.unsplash.com/photo-1551889779-b0cd42b1e81a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'pak-choi', nom: 'Pak Choï', photo: 'https://images.unsplash.com/photo-1551889779-b0cd42b1e81a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ]
  },
  {
    id: 'concombre',
    nom: 'Concombre',
    varietes: [
      { id: 'marketmore', nom: 'Marketmore', photo: 'https://images.unsplash.com/photo-1566486189376-d5f21e25aae4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'telegraph', nom: 'Telegraph', photo: 'https://images.unsplash.com/photo-1566486189376-d5f21e25aae4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'blanc', nom: 'Blanc', photo: 'https://images.unsplash.com/photo-1566486189376-d5f21e25aae4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'lemon', nom: 'Lemon', photo: 'https://images.unsplash.com/photo-1566486189376-d5f21e25aae4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'vert-long-maraicher', nom: 'Vert Long Maraîcher', photo: 'https://images.unsplash.com/photo-1566486189376-d5f21e25aae4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'rollison-telegraph', nom: 'Rollison Telegraph', photo: 'https://images.unsplash.com/photo-1566486189376-d5f21e25aae4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'crystal-apple', nom: 'Crystal Apple', photo: 'https://images.unsplash.com/photo-1566486189376-d5f21e25aae4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'tanja', nom: 'Tanja', photo: 'https://images.unsplash.com/photo-1566486189376-d5f21e25aae4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ]
  },
  {
    id: 'epinard',
    nom: 'Épinard',
    varietes: [
      { id: 'geant-d-hiver', nom: 'Géant d\'Hiver', photo: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'matador', nom: 'Matador', photo: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'america', nom: 'America', photo: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'monstrueux-de-viroflay', nom: 'Monstrueux de Viroflay', photo: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'butterflay', nom: 'Butterflay', photo: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'nobel', nom: 'Nobel', photo: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'bloomsdale', nom: 'Bloomsdale', photo: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ]
  },
  {
    id: 'fenouil',
    nom: 'Fenouil',
    varietes: [
      { id: 'florence', nom: 'Florence', photo: 'https://images.unsplash.com/photo-1627735483792-c3a2b5f33117?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'perfection', nom: 'Perfection', photo: 'https://images.unsplash.com/photo-1627735483792-c3a2b5f33117?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'zefa-fino', nom: 'Zefa Fino', photo: 'https://images.unsplash.com/photo-1627735483792-c3a2b5f33117?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'carmo', nom: 'Carmo', photo: 'https://images.unsplash.com/photo-1627735483792-c3a2b5f33117?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'montebianco', nom: 'Montebianco', photo: 'https://images.unsplash.com/photo-1627735483792-c3a2b5f33117?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'rondo', nom: 'Rondo', photo: 'https://images.unsplash.com/photo-1627735483792-c3a2b5f33117?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ]
  },
  {
    id: 'fraise',
    nom: 'Fraise',
    varietes: [
      { id: 'mara-des-bois', nom: 'Mara des Bois', photo: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'charlotte', nom: 'Charlotte', photo: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'gariguette', nom: 'Gariguette', photo: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'ciflorette', nom: 'Ciflorette', photo: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'cirafine', nom: 'Cirafine', photo: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'maestro', nom: 'Maestro', photo: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'mount-everest', nom: 'Mount Everest', photo: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'anais', nom: 'Anaïs', photo: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'alpine', nom: 'Alpine', photo: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ]
  },
  {
    id: 'melon',
    nom: 'Melon',
    varietes: [
      { id: 'charentais', nom: 'Charentais', photo: 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'canari', nom: 'Canari', photo: 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'galia', nom: 'Galia', photo: 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'petit-gris-de-rennes', nom: 'Petit Gris de Rennes', photo: 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'noir-des-carmes', nom: 'Noir des Carmes', photo: 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'ananas-d-amerique', nom: 'Ananas d\'Amérique', photo: 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'ogen', nom: 'Ogen', photo: 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'honey-dew', nom: 'Honey Dew', photo: 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ]
  },
  {
    id: 'pois',
    nom: 'Pois',
    varietes: [
      { id: 'petit-provencal', nom: 'Petit Provençal', photo: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'telephone', nom: 'Téléphone', photo: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'mangetout', nom: 'Mangetout', photo: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'serpette', nom: 'Serpette', photo: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'merveille-de-kelvedon', nom: 'Merveille de Kelvedon', photo: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'alderman', nom: 'Alderman', photo: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'carouby-de-maussane', nom: 'Carouby de Maussane', photo: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'sugar-snap', nom: 'Sugar Snap', photo: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ]
  },
  {
    id: 'basilic',
    nom: 'Basilic',
    varietes: [
      { id: 'grand-vert', nom: 'Grand Vert', photo: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'pourpre', nom: 'Pourpre', photo: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'fin-vert', nom: 'Fin Vert', photo: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'cannelle', nom: 'Cannelle', photo: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'citron', nom: 'Citron', photo: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'thai', nom: 'Thaï', photo: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'marseillais', nom: 'Marseillais', photo: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ]
  },
  {
    id: 'persil',
    nom: 'Persil',
    varietes: [
      { id: 'commun', nom: 'Commun', photo: 'https://images.unsplash.com/photo-1590759485395-5921f6077594?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'frise', nom: 'Frisé', photo: 'https://images.unsplash.com/photo-1590759485395-5921f6077594?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'geant-d-italie', nom: 'Géant d\'Italie', photo: 'https://images.unsplash.com/photo-1590759485395-5921f6077594?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'plat-vert-fonce', nom: 'Plat Vert Foncé', photo: 'https://images.unsplash.com/photo-1590759485395-5921f6077594?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'frise-vert-fonce', nom: 'Frisé Vert Foncé', photo: 'https://images.unsplash.com/photo-1590759485395-5921f6077594?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ]
  },
  {
    id: 'coriandre',
    nom: 'Coriandre',
    varietes: [
      { id: 'commune', nom: 'Commune', photo: 'https://images.unsplash.com/photo-1600231915919-0f85c2032196?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'a-petites-graines', nom: 'À Petites Graines', photo: 'https://images.unsplash.com/photo-1600231915919-0f85c2032196?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'longue', nom: 'Longue', photo: 'https://images.unsplash.com/photo-1600231915919-0f85c2032196?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 'vietnamienne', nom: 'Vietnamienne', photo: 'https://images.unsplash.com/photo-1600231915919-0f85c2032196?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ]
  }
];

/// Base de données des types de bocaux avec leurs photos
const bocauxTypes = [
  // Sauces
  { id: 'sauce-tomate', nom: 'Sauce Tomate', photo: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'sauce-bolognaise', nom: 'Sauce Bolognaise', photo: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'sauce-carbonara', nom: 'Sauce Carbonara', photo: 'https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'sauce-bechamel', nom: 'Sauce Béchamel', photo: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'sauce-curry', nom: 'Sauce Curry', photo: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'sauce-aigre-douce', nom: 'Sauce Aigre-Douce', photo: 'https://images.unsplash.com/photo-1600626334697-3c80e9e36f29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'sauce-piquante', nom: 'Sauce Piquante', photo: 'https://images.unsplash.com/photo-1589352611665-f80d25a4c1c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'sauce-soja', nom: 'Sauce Soja Maison', photo: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'sauce-pesto', nom: 'Pesto', photo: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'sauce-tartare', nom: 'Sauce Tartare', photo: 'https://images.unsplash.com/photo-1533640924469-f04e06f8898d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'sauce-bearnaise', nom: 'Sauce Béarnaise', photo: 'https://images.unsplash.com/photo-1585672840563-f2af2ced55c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  
  // Soupes
  { id: 'soupe-legumes', nom: 'Soupe de Légumes', photo: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'soupe-potiron', nom: 'Soupe de Potiron', photo: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'soupe-oignon', nom: 'Soupe à l\'Oignon', photo: 'https://images.unsplash.com/photo-1583608354155-90119b2d2b48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'soupe-poisson', nom: 'Soupe de Poisson', photo: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'veloute-champignons', nom: 'Velouté de Champignons', photo: 'https://images.unsplash.com/photo-1616501268209-edfff098fdd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'soupe-minestrone', nom: 'Minestrone', photo: 'https://images.unsplash.com/photo-1605291535356-c69c18b377d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'soupe-lentilles', nom: 'Soupe de Lentilles', photo: 'https://images.unsplash.com/photo-1619057787702-ae6c7fd89f12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'soupe-tomate', nom: 'Soupe de Tomates', photo: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'soupe-miso', nom: 'Soupe Miso', photo: 'https://images.unsplash.com/photo-1626201850129-a96cf18a22d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  
  // Confitures et compotes
  { id: 'confiture', nom: 'Confiture', photo: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'confiture-fraise', nom: 'Confiture de Fraise', photo: 'https://images.unsplash.com/photo-1564941423140-6fab4661b3a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'confiture-abricot', nom: 'Confiture d\'Abricot', photo: 'https://images.unsplash.com/photo-1597227772909-a6d166b48b79?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'confiture-myrtille', nom: 'Confiture de Myrtille', photo: 'https://images.unsplash.com/photo-1551879400-111a9087cd86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'confiture-orange', nom: 'Confiture d\'Orange', photo: 'https://images.unsplash.com/photo-1600626334697-3c80e9e36f29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'confiture-figue', nom: 'Confiture de Figue', photo: 'https://images.unsplash.com/photo-1600626334697-3c80e9e36f29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'compote-pomme', nom: 'Compote de Pomme', photo: 'https://images.unsplash.com/photo-1600626333540-9d9b834e0262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'compote-poire', nom: 'Compote de Poire', photo: 'https://images.unsplash.com/photo-1600626333540-9d9b834e0262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'compote-fruits-rouges', nom: 'Compote de Fruits Rouges', photo: 'https://images.unsplash.com/photo-1600626333540-9d9b834e0262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  
  // Plats préparés
  { id: 'ratatouille', nom: 'Ratatouille', photo: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'cassoulet', nom: 'Cassoulet', photo: 'https://images.unsplash.com/photo-1588165171080-c89acfa5a77d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'chili-con-carne', nom: 'Chili Con Carne', photo: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'boeuf-bourguignon', nom: 'Bœuf Bourguignon', photo: 'https://images.unsplash.com/photo-1608877907149-a206d75ba011?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'blanquette-veau', nom: 'Blanquette de Veau', photo: 'https://images.unsplash.com/photo-1600626334697-3c80e9e36f29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'coq-au-vin', nom: 'Coq au Vin', photo: 'https://images.unsplash.com/photo-1600626334697-3c80e9e36f29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'pot-au-feu', nom: 'Pot-au-Feu', photo: 'https://images.unsplash.com/photo-1600626334697-3c80e9e36f29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'lasagnes', nom: 'Lasagnes', photo: 'https://images.unsplash.com/photo-1619734490039-4fd95fe2bb71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'moussaka', nom: 'Moussaka', photo: 'https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'curry-legumes', nom: 'Curry de Légumes', photo: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'curry-poulet', nom: 'Curry de Poulet', photo: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'dahl-lentilles', nom: 'Dahl de Lentilles', photo: 'https://images.unsplash.com/photo-1585937421612-70a008356c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'choucroute', nom: 'Choucroute', photo: 'https://images.unsplash.com/photo-1600626334697-3c80e9e36f29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  
  // Conserves et pickles
  { id: 'legumes-conserve', nom: 'Légumes en Conserve', photo: 'https://images.unsplash.com/photo-1629651480694-edb5a0666f4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'pickles', nom: 'Pickles', photo: 'https://images.unsplash.com/photo-1593967858208-67dae5a3fb49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'cornichons', nom: 'Cornichons', photo: 'https://images.unsplash.com/photo-1593967858208-67dae5a3fb49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'oignons-pickles', nom: 'Oignons Pickles', photo: 'https://images.unsplash.com/photo-1593967858208-67dae5a3fb49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'legumes-lacto-fermentes', nom: 'Légumes Lacto-fermentés', photo: 'https://images.unsplash.com/photo-1593967858208-67dae5a3fb49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'kimchi', nom: 'Kimchi', photo: 'https://images.unsplash.com/photo-1583224874284-c7bcc72a45e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'chutney', nom: 'Chutney', photo: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'chutney-mangue', nom: 'Chutney de Mangue', photo: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'chutney-tomate', nom: 'Chutney de Tomate', photo: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  
  // Divers
  { id: 'coulis', nom: 'Coulis', photo: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'coulis-fraise', nom: 'Coulis de Fraise', photo: 'https://images.unsplash.com/photo-1564941423140-6fab4661b3a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'coulis-framboise', nom: 'Coulis de Framboise', photo: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'sirop', nom: 'Sirop', photo: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'sirop-menthe', nom: 'Sirop de Menthe', photo: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'sirop-grenadine', nom: 'Sirop de Grenadine', photo: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'sirop-citron', nom: 'Sirop de Citron', photo: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'fruits-au-sirop', nom: 'Fruits au Sirop', photo: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'confit', nom: 'Confit', photo: 'https://images.unsplash.com/photo-1629651480694-edb5a0666f4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'confit-canard', nom: 'Confit de Canard', photo: 'https://images.unsplash.com/photo-1629651480694-edb5a0666f4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'confit-oignon', nom: 'Confit d\'Oignon', photo: 'https://images.unsplash.com/photo-1629651480694-edb5a0666f4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  
  // Catégorie générique
  { id: 'autre', nom: 'Autre', photo: 'https://images.unsplash.com/photo-1629651480694-edb5a0666f4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];
export { legumesData, bocauxTypes };
