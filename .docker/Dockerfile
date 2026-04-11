# Use official Bun image
FROM oven/bun:1.3.12

# Build arguments for dynamic UID/GID from host
ARG APPLICATION_UID=1000
ARG APPLICATION_GID=1000
ARG APPLICATION_USER=application

# Create application user and group
RUN groupadd -g ${APPLICATION_GID} ${APPLICATION_USER} 2>/dev/null || true && \
    useradd -u ${APPLICATION_UID} -g ${APPLICATION_GID} -m -s /bin/bash ${APPLICATION_USER} 2>/dev/null || \
    usermod -g ${APPLICATION_GID} $(getent passwd ${APPLICATION_UID} | cut -d: -f1)

# Create application directory and set ownership
RUN mkdir -p /app/codebase && \
    mkdir -p /app/scripts && \
    chown -R ${APPLICATION_UID}:${APPLICATION_GID} /app

# Set working directory
WORKDIR /app/codebase

# Switch to application user
USER ${APPLICATION_UID}:${APPLICATION_GID}

# Copy entrypoint script
COPY --chmod=755 --chown=${APPLICATION_UID}:${APPLICATION_GID} ./.docker/entrypoint.d/starter.sh /app/scripts/starter.sh

# Set startup command
CMD ["bun", "run", "dev"]

# Set entrypoint
ENTRYPOINT ["/app/scripts/starter.sh"]
