const ironFireSword = new mc.ItemStack(mc.MinecraftItemTypes.diamondSword, 1);
let players = mc.world.getAllPlayers();

let fireAspectEnchant = new mc.Enchantment("fire_aspect", 3);
let enchants = ironFireSword.getComponent("minecraft:enchantments") as mc.ItemEnchantsComponent;
let addedFire = enchants.enchantments.addEnchantment(fireAspectEnchant);

if (!addedFire) {
  log("Could not add fire aspect.");
  return -1;
}

const inventory = players[0].getComponent("inventory") as mc.EntityInventoryComponent;
inventory.container.setItem(0, ironFireSword);

// hover over/select the item in your inventory to see the lore.