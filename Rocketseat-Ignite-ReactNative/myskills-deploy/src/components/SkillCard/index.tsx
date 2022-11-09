import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';

interface SkillCardProps extends TouchableOpacityProps {
  name: string;
}

const SkillCard = ({ name, ...props }: SkillCardProps) => {
  return (
    <TouchableOpacity style={styles.buttonSkill} {...props}>
      <Text style={styles.textSkill}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textSkill: {
    fontSize: 22,
    color: '#fcfcfc',
    fontWeight: 'bold',
  },
  buttonSkill: {
    marginBottom: 24,
    alignItems: 'center',
    padding: 15,
    borderRadius: 50,
    backgroundColor: '#1f1e25',
  },
});

export default SkillCard;
