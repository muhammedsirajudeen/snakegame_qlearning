import numpy as np
import random
class qlearning():
    def __init__(self,snake_position,fruit_position):
        self.snake_position=snake_position
        self.fruit_position=fruit_position
        self.actions=["up","down","left","right"]
        self.rewards_table=None
        self.qtable=None
    def qtable_creator(self):
        self.qtable=np.zeros((50,50,4))
    def rewards_table_creator(self):
        self.rewards_table=np.zeros((50,50))
       
        
        for i in range(50):
            for j in range(50):
                if(i==0 or j==0 or i==49 or j==49):
                    self.rewards_table[i][j]=-100
                else:
                    self.rewards_table[i][j]=-1
                if(i==int(self.fruit_position[0]/10) and j==int(self.fruit_position[1]/10) ):
                    self.rewards_table[i][j]=100
 
    def get_next_action(self,current_row_index,current_col_index):

        if np.random.random() < 0.9:
            return np.argmax(self.qtable[current_row_index,current_col_index])
        else:
            return np.random.randint(4)
    def get_next_location(self,current_row_index,current_column_index,action_index):
        new_row_index=current_row_index
        new_col_index=current_column_index
        if self.actions[action_index]=="up" and current_row_index>0:
            new_row_index-=1
        elif self.actions[action_index]=="right" and current_column_index<50:
            new_col_index+=1
        elif self.actions[action_index] =="down" and current_row_index<50:
            new_row_index+=1
        elif self.actions[action_index]=="left" and current_column_index>0:
            new_col_index-=1
        return new_row_index,new_col_index
        
    def snake_navigator(self):
        starting_row=int(self.snake_position[0]/10)
        starting_column=int(self.snake_position[1]/10)
        actions_took=[]
        while(self.rewards_table[starting_row][starting_column]==-1 ):
            action_index=self.get_next_action(starting_row,starting_column)
            actions_took.append(self.actions[action_index])
            starting_row,starting_column=self.get_next_location(starting_row,starting_column,action_index)
            
        print(self.rewards_table[starting_row,starting_column])
        
        return actions_took
    def get_starting_location(self):
        return random.randint(1,48),random.randint(1,49)
    def qtrainer(self):
    
        for i in range(3000):
            starting_row,starting_column=self.get_starting_location()
       

            
            while(self.rewards_table[starting_row][starting_column]==-1):
                action_index=self.get_next_action(starting_row,starting_column)
                old_row,old_column=starting_row,starting_column
                starting_row,starting_column=self.get_next_location(starting_row,starting_column,action_index)
                reward=self.rewards_table[starting_row,starting_column]
                old_qvalue=self.rewards_table[old_row,old_column]
                temporal_difference=reward+(0.9*np.max(self.qtable[starting_row,starting_column]))-old_qvalue
                new_q_value=old_qvalue+(0.9*temporal_difference)
                self.qtable[old_row,old_column,action_index]=new_q_value
                
        
        print("training complete")

# qclass=qlearning([140,10],[20,20])
# qclass.rewards_table_creator()
# qclass.qtable_creator()
# qclass.qtrainer()
# qclass.snake_navigator()