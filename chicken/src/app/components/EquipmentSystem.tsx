'use client'

import { motion } from 'framer-motion'
import { Sword, Shield, Gem, Package, X } from 'lucide-react'
import { Equipment } from '../hooks/useGameState'

interface EquipmentSystemProps {
  equipment: {
    weapon: Equipment | null
    armor: Equipment | null
    accessory: Equipment | null
  }
  inventory: Equipment[]
  onEquip: (equipmentId: string) => void
  onUnequip: (type: 'weapon' | 'armor' | 'accessory') => void
  onClose: () => void
}

export const EquipmentSystem = ({
  equipment,
  inventory,
  onEquip,
  onUnequip,
  onClose
}: EquipmentSystemProps) => {
  const getRarityColor = (rarity: Equipment['rarity']) => {
    switch (rarity) {
      case 'common': return 'border-gray-400 bg-gray-50'
      case 'uncommon': return 'border-green-400 bg-green-50'
      case 'rare': return 'border-blue-400 bg-blue-50'
      case 'epic': return 'border-purple-400 bg-purple-50'
      case 'legendary': return 'border-yellow-400 bg-yellow-50'
      default: return 'border-gray-400 bg-gray-50'
    }
  }

  const getRarityTextColor = (rarity: Equipment['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-600'
      case 'uncommon': return 'text-green-600'
      case 'rare': return 'text-blue-600'
      case 'epic': return 'text-purple-600'
      case 'legendary': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  const formatStat = (stat: string, value: number) => {
    const statNames = {
      strength: 'Strength',
      agility: 'Agility',
      luck: 'Luck',
      healing: 'Healing',
      maxHealth: 'Max Health'
    }
    return `${statNames[stat as keyof typeof statNames] || stat}: +${value}`
  }

  const renderIcon = (iconString: string) => {
    switch (iconString) {
      case 'Sword':
        return <Sword className="w-6 h-6" />
      case 'Shield':
        return <Shield className="w-6 h-6" />
      case 'Gem':
        return <Gem className="w-6 h-6" />
      default:
        return <Sword className="w-6 h-6" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Package className="w-6 h-6 mr-3 text-blue-400" />
            Equipment & Inventory
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(90vh-120px)] overflow-hidden">
          {/* Equipped Items */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Equipped Items</h3>

            {/* Weapon Slot */}
            <motion.div
              className={`p-4 rounded-lg border-2 ${equipment.weapon ? getRarityColor(equipment.weapon.rarity) : 'border-gray-600 bg-gray-800/50'} min-h-[100px]`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Sword className="w-5 h-5 mr-2 text-gray-400" />
                  <span className="text-white font-medium">Weapon</span>
                </div>
                {equipment.weapon && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onUnequip('weapon')}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Unequip
                  </motion.button>
                )}
              </div>
              {equipment.weapon ? (
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{renderIcon(equipment.weapon.icon)}</span>
                    <div>
                      <div className={`font-semibold ${getRarityTextColor(equipment.weapon.rarity)}`}>
                        {equipment.weapon.name}
                      </div>
                      <div className="text-xs text-gray-400">Lv. {equipment.weapon.level}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-300">
                    {Object.entries(equipment.weapon.stats).map(([stat, value]) =>
                      value ? <div key={stat}>{formatStat(stat, value)}</div> : null
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 text-center py-4">No weapon equipped</div>
              )}
            </motion.div>

            {/* Armor Slot */}
            <motion.div
              className={`p-4 rounded-lg border-2 ${equipment.armor ? getRarityColor(equipment.armor.rarity) : 'border-gray-600 bg-gray-800/50'} min-h-[100px]`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-gray-400" />
                  <span className="text-white font-medium">Armor</span>
                </div>
                {equipment.armor && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onUnequip('armor')}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Unequip
                  </motion.button>
                )}
              </div>
              {equipment.armor ? (
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{renderIcon(equipment.armor.icon)}</span>
                    <div>
                      <div className={`font-semibold ${getRarityTextColor(equipment.armor.rarity)}`}>
                        {equipment.armor.name}
                      </div>
                      <div className="text-xs text-gray-400">Lv. {equipment.armor.level}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-300">
                    {Object.entries(equipment.armor.stats).map(([stat, value]) =>
                      value ? <div key={stat}>{formatStat(stat, value)}</div> : null
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 text-center py-4">No armor equipped</div>
              )}
            </motion.div>

            {/* Accessory Slot */}
            <motion.div
              className={`p-4 rounded-lg border-2 ${equipment.accessory ? getRarityColor(equipment.accessory.rarity) : 'border-gray-600 bg-gray-800/50'} min-h-[100px]`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Gem className="w-5 h-5 mr-2 text-gray-400" />
                  <span className="text-white font-medium">Accessory</span>
                </div>
                {equipment.accessory && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onUnequip('accessory')}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Unequip
                  </motion.button>
                )}
              </div>
              {equipment.accessory ? (
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{renderIcon(equipment.accessory.icon)}</span>
                    <div>
                      <div className={`font-semibold ${getRarityTextColor(equipment.accessory.rarity)}`}>
                        {equipment.accessory.name}
                      </div>
                      <div className="text-xs text-gray-400">Lv. {equipment.accessory.level}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-300">
                    {Object.entries(equipment.accessory.stats).map(([stat, value]) =>
                      value ? <div key={stat}>{formatStat(stat, value)}</div> : null
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 text-center py-4">No accessory equipped</div>
              )}
            </motion.div>
          </div>

          {/* Inventory */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Inventory ({inventory.length})</h3>

            <div className="bg-gray-800/50 rounded-lg p-4 max-h-[500px] overflow-y-auto">
              {inventory.length === 0 ? (
                <div className="text-gray-500 text-center py-8">No items in inventory</div>
              ) : (
                <div className="space-y-3">
                  {inventory.map((item) => (
                    <motion.div
                      key={item.id}
                      className={`p-3 rounded-lg border-2 ${getRarityColor(item.rarity)} cursor-pointer`}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => onEquip(item.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-xl mr-3">{renderIcon(item.icon)}</span>
                          <div>
                            <div className={`font-semibold ${getRarityTextColor(item.rarity)}`}>
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              Lv. {item.level} • {item.type}
                            </div>
                            <div className="text-sm text-gray-300">
                              {Object.entries(item.stats).map(([stat, value]) =>
                                value ? formatStat(stat, value) : null
                              ).filter(Boolean).join(', ')}
                            </div>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            onEquip(item.id)
                          }}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                        >
                          Equip
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
