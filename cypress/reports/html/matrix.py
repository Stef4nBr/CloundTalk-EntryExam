import matplotlib.pyplot as plt
import pandas as pd
from collections import defaultdict

# Define the risk matrix data
data = {
    "Risk ID": ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10"],
    "Impact": ["High", "High", "Medium", "High", "Medium", "High", "Medium", "Medium", "Medium", "High"],
    "Likelihood": ["Medium", "Medium", "High", "Medium", "Medium", "Low", "Medium", "Low", "Low", "Medium"],
    "Risk Level": ["High", "High", "High", "High", "Medium", "Medium", "Medium", "Low", "Low", "High"]
}

df = pd.DataFrame(data)

# Mapping levels
impact_map = {"Low": 1, "Medium": 2, "High": 3}
likelihood_map = {"Low": 1, "Medium": 2, "High": 3}

df['Impact Level'] = df['Impact'].map(impact_map)
df['Likelihood Level'] = df['Likelihood'].map(likelihood_map)

# Group risks by cell
grouped_risks = defaultdict(list)
for _, row in df.iterrows():
    cell = (row['Impact Level'], row['Likelihood Level'])
    grouped_risks[cell].append(row['Risk ID'])

# Stronger colors for zones
risk_zone_colors = {
    (3, 3): "#ff4d4d",  # Red
    (3, 2): "#ff4d4d",
    (2, 3): "#ff4d4d",
    (2, 2): "#ffb84d",  # Orange
    (3, 1): "#ffb84d",
    (1, 3): "#ffb84d",
    (2, 1): "#66cc66",  # Green
    (1, 2): "#66cc66",
    (1, 1): "#66cc66",
}

# Create the plot
fig, ax = plt.subplots(figsize=(8, 8))

# Draw and fill each cell
for x in range(1, 4):
    for y in range(1, 4):
        color = risk_zone_colors.get((x, y), "white")
        ax.add_patch(plt.Rectangle((x - 0.5, y - 0.5), 1, 1, facecolor=color, edgecolor='black', linewidth=1.2))

# Display Risk IDs in cells
for (x, y), ids in grouped_risks.items():
    text = "\n".join(ids)
    ax.text(x, y, text, ha='center', va='center', fontsize=10, fontweight='bold', color='black')

# Axis setup
ax.set_xticks([1, 2, 3])
ax.set_yticks([1, 2, 3])
ax.set_xticklabels(['Low', 'Medium', 'High'])
ax.set_yticklabels(['Low', 'Medium', 'High'])
ax.set_xlabel("Impact", fontsize=12)
ax.set_ylabel("Likelihood", fontsize=12)
ax.set_title("Risk Matrix: Unix Timestamp Converter UI", fontsize=14)
ax.set_xlim(0.5, 3.5)
ax.set_ylim(0.5, 3.5)
ax.set_aspect('equal')
ax.grid(False)

plt.tight_layout()
plt.show()
